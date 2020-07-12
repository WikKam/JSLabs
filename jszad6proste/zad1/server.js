var http = require("http");
var url = require("url");
var fs = require("fs");
var file = 'form.html';


http.createServer(function (request, response) {
  console.log("--------------------------------------");
  console.log("The relative URL of the current request: " + request.url + "\n");
  var url_parts = url.parse(request.url, true);  // parsing (relative) URL

  //Compare the relative URL
  switch (url_parts.pathname) {

    // if relative URL is '/' then send, to a browser,
    // the contents of a file (an HTML document) - its name contains the 'file' variable
    case '/':
      fs.stat(file, function (err, stats) {
        if (err == null) { // If the file exists
          fs.readFile(file, function (err, data) { // Read it content
            response.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
            response.write(data);   // Send the content to the web browser
            response.end();
          });
        }
        else { // If the file does not exists
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write('The ' + file + ' file does not exist');
          response.end();
        } //else
      }); //fs.stat
      break;

    // Process the form content if relative URL is '/submit'
    case '/submit':
      if(request.method == 'POST'){
        let name = '';
        request.on('data', data =>{
          name+=data.toString();
        })
        request.on('end', () => {
          console.log(decodeURIComponent(name));
          name = decodeURIComponent(name)
          response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          response.write( `Hello ${name} (Witaj ${name})`); // Data (response) that we want to send to the web browser
          response.end(); // Sending the answer
      });
      }
      else{
      let name = url_parts.query.imie;
      var welcome = `Hello ${name} (Witaj ${name})`;
      response.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      response.write(welcome); // Data (response) that we want to send to the web browser
      response.end(); // Sending the answer
      console.log("The server sent the '" + welcome + "' text to the browser");
      console.log(`Your name: ${name}`)
    }
      break;

    // Other cases

  } //switch
}).listen(8080);
console.log("The server was started on port 8080");
console.log("To end the server, press 'CTRL + C'");