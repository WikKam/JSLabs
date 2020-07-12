const express = require('express');
const app = express();
const port = 3000
const https = require('https');
const address = 'https://journals.agh.edu.pl/csci/oai?verb=GetRecord&metadataPrefix=oai_dc&identifier=';
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});

app.get('/:identifier/:no', (req,res) => {
    res.set('Content-Type', 'text/xml');
    https.get(address + req.params.identifier + '/' + req.params.no, (response) => {
        let data = '';
        response.on('data',chunk => data+=chunk)
        response.on('end', () => {
            console.log(data);
            res.send(data);
            res.end()
        })
        
    })
})


//Run app, then load http://localhost:port in a browser to see the output.