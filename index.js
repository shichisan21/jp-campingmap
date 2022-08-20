require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const xml2js = require('xml2js');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
// const select = xpath.useNamespaces({
//   "a": "http://olp.yahooapis.jp/ydf/1.0"
// });

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

async function getRequest() {
  const yolpReqData = await request_url_base.get(`%E3%83%A9%E3%83%BC%E3%83%A1%E3%83%B3`)
  // console.log(yolpReqData.data)
  if (yolpReqData.data) {
    return yolpReqData.data;
  } else {
    throw new Error('Unsuccessful request');
  }
}

function fetchCount(){
  getRequest().then(value => {
    console.log("--thrown", xmlContent)
  })
}

    // .then(res => {
    // let result = xpath.evaluate('/ResultInfo/Count/text()', res.data, null, xpath.ORDERED_NODE_ITERATOR_TYPE, null)
    // const city = select(
    //   "/a:ResultInfo/a:Count/text()",
    //   res.data, true
    // )
    // console.log(res.data)
    // messageTest = res.data
    // xml2js.parseString(res.data, (err, result) =>{
    //   if(err){
    //     console.log(err.message)
    //   }else{
    //     messageTest = result.YDF
    //     result.json( messageTest )
    //     console.log(result.YDF.Feature)
    //   }
    // })
    // console.log("--thrown", messageTest)
  // });
// res.send(messageTest)
// .then(res.send( messageTest ))
// .then(res => {
// // handle success
//   res.send("aa")

// });

app.get('/axios', (req, res) => {
  getRequest().then(value => {
    console.log("--thrown", value)
    res.send(value)
    // res.send("後でvalueを投げる")
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})