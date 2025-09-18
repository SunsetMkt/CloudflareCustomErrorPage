# CloudflareCustomErrorPage - Development Guide

## Build System

This project now includes HTML/CSS minification and a development server with live-reload functionality.

### Available Scripts

- `npm run build` - Build production-ready minified HTML and CSS files
- `npm run dev` - Start development server with live-reload on http://localhost:3000

### Minification Features

#### HTML Minification
- Uses `html-minifier-terser` with comprehensive optimization:
  - Removes comments and unnecessary whitespace
  - Removes redundant attributes
  - Minifies inline CSS and JavaScript
  - Uses short doctype
  - **Results**: ~23% size reduction (13KB → 10KB per HTML file)

#### CSS Minification  
- Uses `clean-css` for optimized CSS output:
  - Removes whitespace and comments
  - Optimizes selectors and properties
  - **Results**: ~17% size reduction (3900 → 3225 bytes)

### Development Server

The development server provides:

- **Express-based server** running on port 3000
- **Static file serving** from the `./public/` directory
- **Live-reload functionality** via Server-Sent Events
- **Automatic rebuilding** when source files change
- **File watching** for:
  - `./ejs/**/*` - EJS templates
  - `./i18n/**/*` - Internationalization files
  - `./config.js` - Configuration file
  - `./index.css` - Main stylesheet

### File Structure

```
├── app.js              # Build script with minification
├── dev-server.js       # Development server with live-reload
├── config.js          # Page configuration
├── index.css          # Main stylesheet (source)
├── ejs/               # EJS templates
├── i18n/              # Internationalization files
└── public/            # Generated minified files
    ├── index.css      # Minified CSS
    └── *.html         # Minified HTML files
```

### Development Workflow

1. **Start development server**:
   ```bash
   npm run dev
   ```

2. **Edit source files** in `ejs/`, `i18n/`, `config.js`, or `index.css`

3. **Files are automatically rebuilt** and browser refreshes

4. **Build for production**:
   ```bash
   npm run build
   ```

### Browser Support

The error pages include:
- Multilingual support (English and Chinese)
- Client-side language detection
- Responsive design
- Material Icons
- Google Fonts integration

All generated HTML files are optimized and minified for production use.