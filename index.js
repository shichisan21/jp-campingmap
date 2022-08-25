require('dotenv').config();

const express = require('express');
const axios = require('axios');
const path = require('path');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const select = xpath.useNamespaces({
  "a": "http://olp.yahooapis.jp/ydf/1.0"
});

const app = express();
const PORT = process.env.PORT;

const YAHOO_API_KEY = process.env.YAHOO_API_KEY;
const RESULT_MAX = 100;
const PREFECTURE = 34;
// const QUERY = "桂浜キャンプ場";
const GENRE = "0303006";

const request_url_base = axios.create({
  baseURL: encodeURI(`https://map.yahooapis.jp/search/local/V1/localSearch?appid=${YAHOO_API_KEY}&results=${RESULT_MAX}&ac=${PREFECTURE}&gc=${GENRE}`)
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'front/build')));

app.get('/api', (req, res) => {
  res.json({ message: "Heroku and CircleCI ready!" });
});

async function getRequest() {
  const yolpReqData = await request_url_base.get()
  if (yolpReqData.data) {
    return yolpReqData.data;
  } else {
    throw new Error('Unsuccessful request');
  }
}

async function fetchYolpData(){
  let xmlContents = [];
  let jsonXmlContents = [];
  await getRequest().then(value => {
    const doc = new dom().parseFromString(value);
    const features = select("/a:YDF/a:Feature", doc)
    // const cities = select(
    //   "/a:YDF/a:Feature/a:Name/text()",
    //   doc
    // );

    features.forEach((element, index) => {
      const name = select("a:Name/text()", element)
      const address = select("a:Property/a:Address/text()", element)
      // console.log("NAME: ", name.toString())
      // console.log("ADRR: ", address.toString())
      // console.log("--------------------------")
      // xmlContents[index] = (name.toString() + ' ' + address.toString())
      xmlContents[index] = {name: name.toString(), addr:address.toString()}
    });
    jsonXmlContents = JSON.stringify(xmlContents);
    console.log("**************Received from YOLP**************"+"\n", xmlContents);
  })
  return xmlContents;
}

app.get('/axios', (req, res) => {
  fetchYolpData().then(xmlContents => {
    res.json(xmlContents)
  })
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})