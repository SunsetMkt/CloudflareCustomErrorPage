const ejs = require("ejs");
const configs = [require("./config.js"), require("./i18n/config-zh-CN.js")];
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Collect all i18n configurations
const allI18n = {
  'en': configs[0].i18n,
  'zh-CN': configs[1].i18n
};

// Use the English configuration as the base template structure
const baseConfig = configs[0];

baseConfig.builderConfig.forEach((item) => {
  let html = ejs.render(
    fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
    {
      config: item,
      i18n: baseConfig.i18n, // Use English as default
      allI18n: allI18n, // Pass all i18n configs
      helper: {},
    },
    {
      root: "./ejs/index.ejs",
      filename: "./ejs/index.ejs",
    },
  );
  fs.writeFileSync(`./public/${item.fileName}`, html, { encoding: "utf8" });
});
