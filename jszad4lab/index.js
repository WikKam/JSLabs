const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

http.createServer((req,res) => {
    let urlParts = url.parse(req.url,true);
    if(urlParts.pathname == '/submit'){
        res.writeHead(200, {"Content-Type": "text/plain; charset=utf-8"});
        let instructions = parseForm(urlParts.query['instructions']);
        instructions.forEach(ins => {
            let parsed = parseCommand(ins);
            switch(parsed[1]){
                case "chmod":
                    fs.chmodSync(parsed[0],parsed[2][0]);
                    res.write("Zmieniono prawa dostepu pliku: "
                     + parsed[0] + ' na: ' + parsed[2][0] + '\n');
                    break;
                case "copy":
                    let dir = fs.readdirSync(path.join(__dirname,parsed[0]));
                    dir.forEach(content => {
                        let stat = fs.lstatSync(path.join(
                            path.join(__dirname,parsed[0])
                            ,content));
                        let date1 = stat.mtime;
                        let date2 = Date.now();
                        let diffInDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10);
                        if(diffInDays == parseInt(parsed[2][1],10)){
                            let p1 = path.join(path.join(__dirname,parsed[0]),content);
                            let p2 = path.join(path.join(__dirname,parsed[2][0]),content);
                            console.log(p1);
                            console.log(p2);
                            fs.copyFileSync(
                                p1,
                                p2
                            );
                            res.write("skopiowano plik: " + content + '\n');
                        }
                    })

            }
        })
        res.end()
    }
    else{
        res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        res.write('<form id="form" method="GET" action="/submit">');
	    res.write('<label for="instructions">Enter commands</label>');
	    res.write('<textarea form ="form" name="instructions" id="taid" cols="35" wrap="soft"></textarea>');
	    res.write('<br>');
	    res.write('<input type="submit">');
	    res.write('<input type="reset">');
	    res.write('</form>');
	    res.end();
    }
}).listen(8080)

function parseForm(content){
    return content.split('\r\n');
}
function parseCommand(cmd){
    console.log(cmd);
    let arr = cmd.split(':');
    console.log("array after : split: " + arr);
    let args = arr[2].split(",");
    console.log(cmd[2]);
    console.log(args);
    return[arr[0],arr[1],args];
}