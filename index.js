require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, 'front/build')));
app.use(express.json())

app.get("/api", (req, res) => {
  res.json({ message: "Heroku and CircleCI ready!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/front/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})