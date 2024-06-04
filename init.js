const { createServer } = require('node:http');
const fs = require('node:fs');
const path = require('path');

const hostname = '127.0.0.1';
const PORT = 3000;
// const stats = fs.statSync('./index.html');
// try {
//     const stats = fs.statSync('./index.html');
//   } catch (err) {
//     console.error(err);
// }

// const server = createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'html/text');
//   res.end(stats);
// });
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// });
createServer(function(request, response) {  
    console.log(request.url);
    const regUrl = (url) => request.url.match(url);
    // fs.readFile('./index.html', function (err, html) {
    //     response.writeHeader(200, {"Content-Type": "text/html"});  
    //     // response.write(html);  
    //     response.end(html);  
    // });  
    if (request.url === "/") {
        fs.readFile('./index.html', function (err, html) {
            response.writeHeader(200, {"Content-Type": "text/html"});  
            // response.write(html);  
            response.end(html);  
        });  
    } else if (regUrl("\.css$")) {
        fs.readFile(path.join(__dirname, request.url), function (err, css) {
            response.writeHeader(200, {"Content-Type": "text/css"});  
            // response.write(html);  
            response.end(css);  
        });
    } else if (regUrl("\.js$")) {
        fs.readFile(path.join(__dirname, request.url), function (err, js) {
            response.writeHeader(200, {"Content-Type": "text/javascript"});  
            // response.write(html);  
            response.end(js);  
        });
    } else if (regUrl("\.svg$")) {
        fs.readFile(path.join(__dirname, request.url), function (err, svg) {
            response.writeHeader(200, {"Content-Type": "text/svg+xml"});  
            // response.write(html);  
            response.end(svg);  
        });
    } else if (regUrl("\.png$")) {
        fs.readFile(path.join(__dirname, request.url), function (err, png) {
            response.writeHeader(200, {"Content-Type": "text/png"});  
            // response.write(html);  
            response.end(png);  
        });
    } else {
        response.statusCode = 400;
    }
}).listen(PORT);