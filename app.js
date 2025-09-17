const ejs = require("ejs");
const fs = require("fs");

// Load configuration and translation files
const config = require("./config.js");
const enUS = require("./i18n/config-en-US.js");
const zhCN = require("./i18n/config-zh-CN.js");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Collect all i18n configurations
const allI18n = {
  'en-US': enUS.i18n,
  'zh-CN': zhCN.i18n
};

// Default language is English
const defaultI18n = enUS.i18n;

// Generate multilingual pages
config.builderConfig.forEach((pageConfig) => {
  // Create helpers and footer based on default language for page structure
  const helper = config.createHelper(defaultI18n);
  
  // Resolve the card based on cardType
  const card = helper[pageConfig.cardType];
  
  // Create the page configuration with multilingual support
  const item = {
    fileName: pageConfig.fileName,
    statusCode: pageConfig.statusCode,
    textKey: pageConfig.textKey,
    card: card,
    reasonKey: pageConfig.reasonKey,
    footerType: pageConfig.footerType, // Pass footerType to template for JavaScript logic
    script: pageConfig.script,
    allI18n: allI18n // Pass all translations to the template
  };

  let html = ejs.render(
    fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
    {
      config: item,
      i18n: defaultI18n, // Default i18n for template structure
      allI18n: allI18n, // All translations for multilingual support
      helper: {},
      getStatusKey: config.getStatusKey, // Helper function to get status i18n key
    },
    {
      root: "./ejs/index.ejs",
      filename: "./ejs/index.ejs",
    },
  );
  fs.writeFileSync(`./public/${item.fileName}`, html, { encoding: "utf8" });
});
