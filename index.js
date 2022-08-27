require("dotenv").config();

const express = require("express");
const axios = require("axios");
const path = require("path");
const xpath = require("xpath");
const dom = require("xmldom").DOMParser;
const select = xpath.useNamespaces({
  a: "http://olp.yahooapis.jp/ydf/1.0",
});

const app = express();
const PORT = process.env.PORT;

const YAHOO_API_KEY = process.env.YAHOO_API_KEY;
const RESULT_MAX = 100;
const GENRE = "0303006";

app.use(express.json());
app.use(express.static(path.join(__dirname, "front/build")));

async function getRequest(prefCode) {
  let paddedCode = prefCode;
  if (paddedCode < 10) {
    paddedCode = "0" + paddedCode;
  }
  console.log("県コード", paddedCode);
  const yolpReqData = await axios.get(
    `https://map.yahooapis.jp/search/local/V1/localSearch?appid=${YAHOO_API_KEY}&results=${RESULT_MAX}&gc=${GENRE}&ac=${paddedCode}`
  );
  console.log("------------Request sended------------");
  if (yolpReqData.data) {
    return yolpReqData.data;
  } else {
    throw new Error("Unsuccessful request");
  }
}

async function fetchYolpData(prefCode) {
  let xmlContents = [];
  let jsonXmlContents = [];
  await getRequest(prefCode).then((value) => {
    const doc = new dom().parseFromString(value);
    const features = select("/a:YDF/a:Feature", doc);
    // const cities = select(
    //   "/a:YDF/a:Feature/a:Name/text()",
    //   doc
    // );

    features.forEach((element, index) => {
      const name = select("a:Name/text()", element);
      const address = select("a:Property/a:Address/text()", element);
      // console.log("NAME: ", name.toString())
      // console.log("ADRR: ", address.toString())
      // console.log("--------------------------")
      // xmlContents[index] = (name.toString() + ' ' + address.toString())
      xmlContents[index] = { name: name.toString(), addr: address.toString() };
    });
    jsonXmlContents = JSON.stringify(xmlContents);
    console.log(
      "**************Received from YOLP**************" + "\n",
      xmlContents
    );
  });
  return xmlContents;
}

app.get("/axios", (req, res) => {
  console.log("params", req.query.prefCode);
  fetchYolpData(req.query.prefCode).then((xmlContents) => {
    res.json(xmlContents);
  });
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/front/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
});
