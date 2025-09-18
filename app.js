const ejs = require("ejs");
const fs = require("fs");
const { minify: minifyHtml } = require("html-minifier-terser");
const CleanCSS = require("clean-css");

// Load configuration and translation files
const config = require("./config.js");
const enUS = require("./i18n/config-en-US.js");
const zhCN = require("./i18n/config-zh-CN.js");

// Configuration for HTML minification
const htmlMinifierOptions = {
  collapseWhitespace: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
  minifyCSS: true,
  minifyJS: true,
};

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

// Minify CSS and copy to public directory
const cssContent = fs.readFileSync("./index.css", { encoding: "utf8" });
const minifiedCss = new CleanCSS().minify(cssContent);
if (minifiedCss.errors.length > 0) {
  console.error("CSS minification errors:", minifiedCss.errors);
} else {
  fs.writeFileSync("./public/index.css", minifiedCss.styles, { encoding: "utf8" });
  console.log(`CSS minified: ${cssContent.length} → ${minifiedCss.styles.length} bytes`);
}

// Collect all i18n configurations
const allI18n = {
  "en-US": enUS.i18n,
  "zh-CN": zhCN.i18n,
};

// Default language is English
const defaultI18n = enUS.i18n;

// Generate multilingual pages
const buildPages = async () => {
  for (const pageConfig of config.builderConfig) {
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
      script: pageConfig.script,
      allI18n: allI18n, // Pass all translations to the template
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
    
    // Minify HTML
    try {
      const minifiedHtml = await minifyHtml(html, htmlMinifierOptions);
      fs.writeFileSync(`./public/${item.fileName}`, minifiedHtml, { encoding: "utf8" });
      console.log(`Generated ${item.fileName}: ${html.length} → ${minifiedHtml.length} bytes`);
    } catch (error) {
      console.error(`Error minifying ${item.fileName}:`, error);
      fs.writeFileSync(`./public/${item.fileName}`, html, { encoding: "utf8" });
    }
  }
};

buildPages().then(() => {
  console.log("Build completed successfully!");
}).catch((error) => {
  console.error("Build failed:", error);
});
