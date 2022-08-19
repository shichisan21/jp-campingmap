require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const xml2js = require('xml2js');
const { send } = require('process');

const app = express();
const PORT = process.env.PORT;
const YAHOO_API_KEY = process.env.YAHOO_API_KEY;
const request_url_base = axios.create({
  baseURL: `https://map.yahooapis.jp/search/local/V1/localSearch?appid=${YAHOO_API_KEY}&query=`
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'front/build')));

app.get('/api', (req, res) => {
  res.json({ message: "Heroku and CircleCI ready!" });
});

app.get('/axios', (req, res) => {
  request_url_base.get(`%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3`)
    .then(res => {
      xml2js.parseString(res.data, (err, result) =>{
        if(err){
          console.log(err.message)
        }else{
          // console.log(result.YDF.Feature)
        }
      })
    })
    .then(res.json({ message: "axios_test" }))
    .then(console.log("----------------------------------------------------------------thrown", res));
  // .then(function (res) {
    // // handle success
    // console.log("axios test", res.data)
    // });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})