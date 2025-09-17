const ejs = require("ejs");
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Load both language configs
const enConfig = require("./config.js");
const zhConfig = require("./i18n/config-zh-CN.js");

// Create combined i18n object for client-side use
const allI18n = {
  'en': enConfig.i18n,
  'zh-CN': zhConfig.i18n
};

// Helper function to find corresponding Chinese config for English config
const findChineseConfig = (enItem) => {
  // Try to find matching config by status code and filename patterns
  const zhItem = zhConfig.builderConfig.find(zh => 
    zh.statusCode === enItem.statusCode ||
    (enItem.fileName.includes('challenge') && zh.fileName.includes('challenge')) ||
    (enItem.fileName.includes('block') && zh.fileName.includes('block')) ||
    (enItem.fileName.includes('error') && zh.fileName.includes('error')) ||
    (enItem.fileName === 'index.html' && zh.fileName.includes('index.html'))
  );
  return zhItem || zhConfig.builderConfig[0]; // fallback to first item
};

// Generate pages using original template with English content but multi-language data
enConfig.builderConfig.forEach((enItem) => {
  const zhItem = findChineseConfig(enItem);
  
  const filePath = `./public/${enItem.fileName}`;
  const dir = require('path').dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = ejs.render(
    fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
    {
      config: enItem,       // Use English config for generation
      i18n: enConfig.i18n,  // Use English i18n for generation
      allI18n: allI18n,     // Include all languages for client-side switching
      zhConfig: zhItem,     // Include Chinese config for client-side switching
      helper: {},
    },
    {
      root: "./ejs/index.ejs",
      filename: "./ejs/index.ejs",
    },
  );
  fs.writeFileSync(filePath, html, { encoding: "utf8" });
});
