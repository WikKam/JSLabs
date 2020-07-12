const http = require('http');
const url = require('url');
const path = 'http://worldtimeapi.org/api/timezone'
http.createServer((req, res) => {
    urlParts = url.parse(req.url, true);
    http.get(path + urlParts.pathname, (resp) => {
        let data = '';
        resp.on('data', (chunk) => {
            data += chunk;
        });
        resp.on('end', () => {
            data = JSON.parse(data);
            ret = {timezone: data.timezone, datetime: data.datetime};
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            if(JSON.stringify(ret) == '{}'){
                res.write("error, invalid region, area, or path\n");
            }
            else{
            res.write(JSON.stringify(ret));
            }
            res.end();
        });
    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });

}).listen(8080)