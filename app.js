const ejs = require("ejs");
const configs = [require("./config.js"), require("./i18n/config-zh-CN.js")];
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Collect all i18n configurations
const allI18n = {
  en: configs[0].i18n,
  "zh-CN": configs[1].i18n,
};

// Process all configurations
configs.forEach((config, index) => {
  config.builderConfig.forEach((item) => {
    let html = ejs.render(
      fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
      {
        config: item,
        i18n: config.i18n, // Use the appropriate i18n for this config
        allI18n: allI18n, // Pass all i18n configs
        helper: {},
      },
      {
        root: "./ejs/index.ejs",
        filename: "./ejs/index.ejs",
      },
    );

    // Create directory if it doesn't exist
    const filePath = `./public/${item.fileName}`;
    const dirPath = filePath.substring(0, filePath.lastIndexOf("/"));
    if (dirPath && !fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    fs.writeFileSync(filePath, html, { encoding: "utf8" });
  });
});
