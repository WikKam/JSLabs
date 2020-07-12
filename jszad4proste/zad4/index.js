var http = require("http");
var url = require("url");
var getContent = require('./content.js');
http.createServer((req,res) => {
    let urlParts = url.parse(req.url,true); 
    if(urlParts.pathname =='/submit'){
        let path = urlParts.query['path'];
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        getContent.check(path).then((val) => {
            res.write(val);
            res.end();
        })
    }
    else{
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<form method="GET" action="/submit">');
	    res.write('<label for="path">Enter a path</label>');
	    res.write('<input name="path">');
	    res.write('<br>');
	    res.write('<input type="submit">');
	    res.write('<input type="reset">');
	    res.write('</form>');
	    res.end();
    }
}).listen(8080);