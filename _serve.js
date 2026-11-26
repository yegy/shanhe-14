const http=require("http"),fs=require("fs"),path=require("path");
const root=__dirname;
const MIME={".css":"text/css; charset=utf-8",".js":"application/javascript; charset=utf-8",".html":"text/html; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".webp":"image/webp",".svg":"image/svg+xml",".ico":"image/x-icon",".json":"application/json; charset=utf-8"};
http.createServer((req,res)=>{
  let p=decodeURIComponent(req.url.split("?")[0]); if(p==="/") p="/index.html";
  fs.readFile(path.join(root,p),(e,d)=>{ if(e){res.writeHead(404);res.end("404");return;}
    const ext=path.extname(p).toLowerCase();
    res.writeHead(200,{"Content-Type":MIME[ext]||"application/octet-stream"}); res.end(d); });
}).listen(8123,"127.0.0.1",()=>console.log("serving http://127.0.0.1:8123"));
