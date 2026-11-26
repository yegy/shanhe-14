// 山河十四卷 v1.0 · 生成网页端单一原子包 js/game.bundle.js 与离线单文件 HTML：dist/山河十四卷_v1.0_单文件离线版.html
"use strict";
const fs = require("fs");
const path = require("path");

const root = __dirname;
const assetsDir = path.join(root, "assets");
const distDir = path.join(root, "dist");
const webBundlePath = path.join(root, "js", "game.bundle.js");
const outPath = path.join(distDir, "山河十四卷_v1.0_单文件离线版.html");

// 1. 先按 js/modules.json 合并 36 个模块化源码为单一原子包 js/game.bundle.js（避免弱网/CDN 丢包导致半加载卡死）
const modules = JSON.parse(fs.readFileSync(path.join(root, "js", "modules.json"), "utf8"));
const bundleChunks = [
  "/* 山河十四卷 v1.0 · 自动合并的网页端单一原子包（由 node _bundle.js 从 js/modules.json 生成） */\n"
];
for (const rel of modules) {
  const code = fs.readFileSync(path.join(root, rel), "utf8");
  bundleChunks.push(`\n/* ===== ${rel} ===== */\n${code}\n`);
}
const webBundleCode = bundleChunks.join("");
fs.writeFileSync(webBundlePath, webBundleCode, "utf8");
const kb = (Buffer.byteLength(webBundleCode, "utf8") / 1024).toFixed(1);
console.log(`WEB BUNDLE OK: ${webBundlePath} (${kb} KB, ${modules.length} modules)`);

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const files = fs.readdirSync(assetsDir).filter(f => /\.(webp|png|jpe?g|svg)$/i.test(f)).sort();

const map = {};
for (const f of files) {
  const ext = path.extname(f).slice(1).toLowerCase();
  const mime = ext === "webp" ? "image/webp" : ext === "png" ? "image/png" : ext === "svg" ? "image/svg+xml" : "image/jpeg";
  const b64 = fs.readFileSync(path.join(root, "assets", f)).toString("base64");
  map["assets/" + f] = `data:${mime};base64,${b64}`;
}

// 2. 内联 CSS 文件（兼容 ?v=... 查询串）并替换其中的 ../assets/*.webp
html = html.replace(/<link\s+rel="stylesheet"\s+href="([^"]+)">/g, (_, href) => {
  const cleanHref = href.split("?")[0];
  let css = fs.readFileSync(path.join(root, cleanHref), "utf8");
  for (const [rel, dataUri] of Object.entries(map)) {
    css = css.split(`"../${rel}"`).join(`"${dataUri}"`).split(`"${rel}"`).join(`"${dataUri}"`);
  }
  return `<style>\n${css}\n</style>`;
});

// 3. 替换静态 HTML 中的 src="assets/..."
const firstScriptIdx = html.indexOf("<script src=");
let bodyPart = html.slice(0, firstScriptIdx);
let scriptsPart = html.slice(firstScriptIdx);
for (const [rel, dataUri] of Object.entries(map)) {
  bodyPart = bodyPart.split(`"${rel}"`).join(`"${dataUri}"`);
}

// 4. 内联 <script src="..."> 模块（兼容 ?v=... 查询串）
scriptsPart = scriptsPart.replace(/<script\s+src="([^"]+)"><\/script>/g, (_, src) => {
  const cleanSrc = src.split("?")[0];
  const code = fs.readFileSync(path.join(root, cleanSrc), "utf8");
  return `<script>/* ${cleanSrc} */\n${code}\n</script>`;
});

html = bodyPart + `<script>window.__ASSETS__=${JSON.stringify(map)};</script>\n` + scriptsPart;

fs.mkdirSync(distDir, { recursive: true });
fs.writeFileSync(outPath, html, "utf8");
const mb = (Buffer.byteLength(html, "utf8") / 1024 / 1024).toFixed(2);
console.log(`BUNDLED v1.0 OK: ${outPath} (${mb} MB, ${files.length} embedded assets)`);
