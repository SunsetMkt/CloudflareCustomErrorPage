const ejs = require("ejs");
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Load both language configs
const enConfig = require("./config.js");
const zhConfig = require("./i18n/config-zh-CN.js");

// Create combined i18n object
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

// Generate unified multi-language pages using original filenames
enConfig.builderConfig.forEach((enItem) => {
  const zhItem = findChineseConfig(enItem);
  
  // Create combined config for multi-lang template
  const multiLangConfig = {
    statusCode: enItem.statusCode,
    fileName: enItem.fileName, // Use original filename without prefix
    text: enItem.text,
    textZh: zhItem.text,
    card: enItem.card,
    cardZh: zhItem.card,
    reason: enItem.reason,
    reasonZh: zhItem.reason,
    script: enItem.script || (() => {})
  };

  const filePath = `./public/${multiLangConfig.fileName}`;
  const dir = require('path').dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  let html = ejs.render(
    fs.readFileSync("./ejs/multi-lang.ejs", { encoding: "utf8" }),
    {
      config: multiLangConfig,
      allI18n: allI18n,
    },
    {
      root: "./ejs/multi-lang.ejs",
      filename: "./ejs/multi-lang.ejs",
    },
  );
  fs.writeFileSync(filePath, html, { encoding: "utf8" });
});
