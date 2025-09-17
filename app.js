const ejs = require("ejs");
const config = require("./combined-config.js");
const fs = require("fs");

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}
fs.copyFileSync("./index.css", "./public/index.css");

// Generate one set of multilingual pages
config.builderConfig.map((item) => {
  let html = ejs.render(
    fs.readFileSync("./ejs/combined-index.ejs", { encoding: "utf8" }),
    {
      config: item,
      i18n: config.i18n,
      helper: {},
    },
    {
      root: "./ejs/combined-index.ejs",
      filename: "./ejs/combined-index.ejs",
    },
  );
  fs.writeFileSync(`./public/${item.fileName}`, html, { encoding: "utf8" });
});

console.log("Build completed successfully!");
console.log(`Generated ${config.builderConfig.length} multilingual pages in ./public/`);
