const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const mysql = require('mysql');
const config = require('./config');
// const conn = mysql.createConnection(config);
const Twitter = require('twitter');

/* =======================
 LOAD THE CONFIG
 ==========================*/
const port = process.env.PORT || 3000;

/* =======================
 EXPRESS CONFIGURATION
 ==========================*/
const app = express();
// process.on('uncaughtException', function(err) {
// 	console.log('Caught exception: ' + err);
// });
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
// parse JSON and url-encoded query
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));

const client = new Twitter({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  access_token_key: config.access_token_key,
  access_token_secret: config.access_token_secret
});


// print the request log on console
app.use(morgan(':remote-addr'), function (req, res, next) {
  next();
});

app.use(morgan(':method'), function (req, res, next) {
  next();
});

app.use(morgan(':url'), function (req, res, next) {
  next();
});

app.use(morgan(':date'), function (req, res, next) {
  next();
});

app.use(morgan(':status'), function (req, res, next) {
  next();
});

app.get('/', (req, res) => {
  // res.send('alive');
  client.get('followers/list', { screen_name: 'twitterdev' }, function (error, tweets, response) {
    if (!error) {
      return res.status(200).json({
        tweets
      })
    }
  });
});


// open the server
app.listen(port, () => {
  console.log(`Express is running on port ${port}`)
});
