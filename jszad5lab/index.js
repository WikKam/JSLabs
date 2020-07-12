const express = require('express');
const https = require('https');
const app = express();
const axios = require('axios');

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');   

app.get('/', (req, res) => {
    res.send('Hello World!');
});
function mapResponses(responses){
    let map = new Map();
    responses.forEach(dataArr => {
        dataArr.data.forEach(data =>{
            if(!map.has(data.Date)){
                map.set(data.Date,[]);
            }
            map.get(data.Date).push(data);
        })
    })
    return map;
}

function getCountriesNames(responses){
    let set = new Set();
    responses.forEach(dataArr => {
        dataArr.data.forEach(data => set.add(data.Country));
    })
    console.log([...set])
    return [...set]
}


app.get('/summary/:parameter',(req,res) => {
    let url = "https://api.covid19api.com/summary";
    let parameter = req.params.parameter;
    https.get(url, apiRes =>{
        let body = "";
        apiRes.on("data",data => body += data);
        apiRes.on("end",() => {
            let parsedBody = JSON.parse(body);
            /*res.write(`<table>`)
            res.write(`<tr><th>Country</th><th>${parameter}</th>`)*/
            let sortedCountries = parsedBody["Countries"];
            sortedCountries.sort((a,b) => {
                return parseInt(a[parameter]) - parseInt(b[parameter])
            })
            endArr = sortedCountries.map(x => {
                return {Country: x.Country, value:x[parameter]};
            });
            res.render('summary',{
                pretty:true,
                data:endArr,
                parameter: parameter,
            });
          //  res.end()
        })
    })
})

function buildUrl(country,from,to){
    return `https://api.covid19api.com/country/${country}/status/confirmed/live?from=${from}&to=${to}`
}
app.get('/byCountryLive/:from/:to/:k1/:k2/:k3',(req,res)=>{
    let from = req.params.from;
    let to = req.params.to;
    let countries = [req.params.k1,req.params.k2,req.params.k3];
    axios.all([
        axios.get(buildUrl(countries[0],from,to)),
        axios.get(buildUrl(countries[1],from,to)),
        axios.get(buildUrl(countries[2],from,to)),
    ]).then(responses => {
        let map = mapResponses(responses);
        let names = getCountriesNames(responses);
        /*res.write(`<table>`)
        res.write(`<tr><th>Data</th><th>${names[0]}</th><th>${names[1]}</th><th>${names[2]}</th></tr>`)
        map.forEach((key,val) =>{
            res.write(`<tr><th>${val.slice(0,10)}</th><th>${key[0].Cases}</th><th>${key[1].Cases}</th><th>${key[2].Cases}</th></tr>`)
        })
        res.write(`</table>`);
        res.end();*/
        list = Array.from(map).map(value => {
            console.log("val: "+ value[1]);
            return {
                Date:value[0].slice(0,10),
                Cases1: value[1][0].Cases,
                Cases2: value[1][1].Cases,
                Cases3: value[1][2].Cases,
            }
        })
        res.render("byCountryLive",{
            pretty:true,
            data:list,
            name1: names[0],
            name2: names[1],
            name3: names[2]
        })
    })
})
app.listen(8080, () => {
    console.log('Example app listening on port 8080!');
});

//Run app, then load http://localhost:port in a browser to see the output.