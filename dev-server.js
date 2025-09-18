const express = require('express');
const path = require('path');
const chokidar = require('chokidar');
const { execSync } = require('child_process');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, 'public')));

// Live reload script injection
const liveReloadScript = `
<script>
  // Live reload functionality
  const eventSource = new EventSource('/dev/reload');
  eventSource.onmessage = function(event) {
    if (event.data === 'reload') {
      window.location.reload();
    }
  };
  
  // Reconnect if connection is lost
  eventSource.onerror = function() {
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };
</script>
`;

// Middleware to inject live reload script into HTML files
app.use((req, res, next) => {
  if (req.path.endsWith('.html')) {
    const filePath = path.join(__dirname, 'public', req.path);
    
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Inject live reload script before closing body tag
      if (content.includes('</body>')) {
        content = content.replace('</body>', liveReloadScript + '</body>');
      } else if (content.includes('</html>')) {
        content = content.replace('</html>', liveReloadScript + '</html>');
      }
      
      res.type('html');
      res.send(content);
      return;
    }
  }
  next();
});

// Server-sent events endpoint for live reload
const clients = new Set();

app.get('/dev/reload', (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  
  clients.add(res);
  
  req.on('close', () => {
    clients.delete(res);
  });
});

// Function to broadcast reload to all connected clients
function broadcastReload() {
  console.log('🔄 Broadcasting reload to', clients.size, 'clients');
  clients.forEach(client => {
    client.write('data: reload\n\n');
  });
}

// Function to clear require cache for config and i18n files
function clearRequireCache() {
  const cacheKeys = Object.keys(require.cache).filter(key =>
    key.includes('/config.js') ||
    key.includes('/i18n/') ||
    key.includes('/app.js')
  );
  
  cacheKeys.forEach(key => {
    delete require.cache[key];
  });
}

// Function to rebuild the project
function rebuild() {
  console.log('🔨 Rebuilding project...');
  try {
    // Clear require cache to ensure fresh files are loaded
    clearRequireCache();
    
    execSync('npm run build', { stdio: 'pipe' });
    console.log('✅ Rebuild completed successfully');
    broadcastReload();
  } catch (error) {
    console.error('❌ Rebuild failed:', error.stdout?.toString() || error.message);
  }
}

// Watch for file changes
const watcher = chokidar.watch([
  './ejs/**/*',
  './i18n/**/*',
  './config.js',
  './index.css'
], {
  ignored: /node_modules/,
  persistent: true,
  ignoreInitial: true
});

console.log('👀 Watching for changes in:');
console.log('   ./ejs/**/*');
console.log('   ./i18n/**/*');
console.log('   ./config.js');
console.log('   ./index.css');

watcher.on('change', (filePath) => {
  console.log(`📝 File changed: ${filePath}`);
  rebuild();
});

watcher.on('add', (filePath) => {
  console.log(`📄 File added: ${filePath}`);
  rebuild();
});

watcher.on('unlink', (filePath) => {
  console.log(`🗑️  File deleted: ${filePath}`);
  rebuild();
});

// Initial build
console.log('🔨 Initial build...');
rebuild();

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Development server running at http://localhost:${PORT}`);
  console.log('👀 Watching for file changes...');
  console.log('📁 Serving files from ./public/');
  console.log('');
  console.log('Available pages:');
  
  // List available HTML files
  try {
    const files = fs.readdirSync('./public').filter(f => f.endsWith('.html'));
    files.forEach(file => {
      console.log(`   http://localhost:${PORT}/${file}`);
    });
  } catch (error) {
    console.log('   (HTML files will be listed after initial build)');
  }
});

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Shutting down development server...');
  watcher.close();
  process.exit(0);
});