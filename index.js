require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const dns = require('dns');
const urlparser = require('url');
const cors = require('cors');
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));

let urlDatabase = {}; // Almacenará las URL en lugar de la base de datos MongoDB

app.get('/', (req, res) => {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.post('/api/shorturl', (req, res) => {
  const bodyurl = req.body.url;
  const checkaddress = dns.lookup(urlparser.parse(bodyurl).hostname, (err, address) => {
    if (!address) {
      res.json({ error: 'invalid url' });
    } else {
      let shortUrl = Math.floor(Math.random() * 100000);
      console.log(shortUrl);
      urlDatabase[shortUrl] = bodyurl; // Almacena la URL en el objeto en lugar de la base de datos
      res.json({ original_url: bodyurl, short_url: shortUrl });
    }
  });
});

// Redirige a la URL original
app.get('/api/shorturl/:short_url', (req, res) => {
  const shortUrl = parseInt(req.params.short_url);
  const originalUrl = urlDatabase[shortUrl];

  if (originalUrl) {
    res.redirect(originalUrl);
  } else {
    res.json({ error: 'invalid short_url' });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
