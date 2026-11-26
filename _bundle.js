// 山河十四卷 v1.0 · 多模块一键打包成真正离线单文件 HTML：dist/山河十四卷_v1.0_单文件离线版.html
"use strict";
const fs = require("fs");
const path = require("path");

const root = __dirname;
const assetsDir = path.join(root, "assets");
const distDir = path.join(root, "dist");
const outPath = path.join(distDir, "山河十四卷_v1.0_单文件离线版.html");

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = fs.readdirSync(assetsDir).filter(f => /\.(webp|png|jpe?g|svg)$/i.test(f)).sort();

const map = {};
for (const f of files) {
  const ext = path.extname(f).slice(1).toLowerCase();
  const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
  const b64 = fs.readFileSync(path.join(assetsDir, f)).toString("base64");
  map["assets/" + f] = `data:${mime};base64,${b64}`;
}

// 1. 内联 CSS 文件并替换其中的 ../assets/*.webp
html = html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)">/g, (_, href) => {
  let css = fs.readFileSync(path.join(root, href), "utf8");
  for (const [rel, dataUri] of Object.entries(map)) {
    css = css.split(`"../${rel}"`).join(`"${dataUri}"`).split(`"${rel}"`).join(`"${dataUri}"`);
  }
  return `<style>\n${css}\n</style>`;
});

// 2. 替换静态 HTML 中的 src="assets/..."
const firstScriptIdx = html.indexOf("<script src=");
let bodyPart = html.slice(0, firstScriptIdx);
let scriptsPart = html.slice(firstScriptIdx);
for (const [rel, dataUri] of Object.entries(map)) {
  bodyPart = bodyPart.split(`"${rel}"`).join(`"${dataUri}"`);
}

// 3. 内联所有 <script src="..."> 模块
scriptsPart = scriptsPart.replace(/<script\s+src="([^"]+)"><\/script>/g, (_, src) => {
  const code = fs.readFileSync(path.join(root, src), "utf8");
  return `<script>/* ${src} */\n${code}\n</script>`;
});

html = bodyPart + `<script>window.__ASSETS__=${JSON.stringify(map)};</script>\n` + scriptsPart;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(outPath, html, "utf8");
const mb = (Buffer.byteLength(html, "utf8") / 1024 / 1024).toFixed(2);
console.log(`BUNDLED v1.0 OK: ${outPath} (${mb} MB, ${files.length} embedded assets)`);
