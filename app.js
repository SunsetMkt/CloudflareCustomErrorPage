const ejs = require("ejs");
const configs = [require("./config.js"), require("./i18n/config-zh-CN.js")];
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

configs.forEach((config) =>
  config.builderConfig.map((item) => {
    // Create subdirectories if needed
    const filePath = `./public/${item.fileName}`;
    const dir = require('path').dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    let html = ejs.render(
      fs.readFileSync("./ejs/index.ejs", { encoding: "utf8" }),
      {
        config: item,
        i18n: config.i18n,
        helper: {},
      },
      {
        root: "./ejs/index.ejs",
        filename: "./ejs/index.ejs",
      },
    );
    fs.writeFileSync(filePath, html, { encoding: "utf8" });
  }),
);
