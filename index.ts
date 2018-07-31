import http = require('http');
import fs = require('fs');
import path = require('path');

const hostname:string = '127.0.0.1';
const port:number = 3000;

const server:http.Server = http.createServer((req:http.ServerRequest, res:http.ServerResponse) => {
  let filePath = "." + req.url;
  if (filePath == "./") {
    filePath = "./index.html";
  }

  let extName = path.extname(filePath);
  let contentType = "text/html";
  switch(extName) {
    case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.png':
            contentType = 'image/png';
            break;      
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.wav':
            contentType = 'audio/wav';
            break;
  }

  fs.readFile(filePath, function(error:NodeJS.ErrnoException, content:Buffer){
    if(error) {
      if(error.code == "ENOENT") {
        fs.readFile('./404.html', function(error, content){
          res.writeHead(200, {'Content-Type': contentType});
          res.end(content, 'utf-8');
        });
      }
      else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
        res.end(); 
      }
    }
    else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
  }
  });


});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});