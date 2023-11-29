require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// My Code
let dataBaseUrl = {}
let nextUrl = 1;

app.post('/api/shorturl', function(req, res) {
  const original_url = req.body.original_url;

  nextUrl +1;
  dataBaseUrl[nextUrl] = original_url;
  const short_url = nextUrl;
  res.json({original_url, short_url})
});

app.post('/api/shorturl/shorturl', function(req, res) {
  const url = req.body.original_url;
  if (dataBaseUrl.hasOwnProperty(shortUrl)) {
    res.redirect(url);
  } else {
    res.json({error: 'invalid url'});
  }
  res.redirect(url);
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
