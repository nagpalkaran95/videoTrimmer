const express = require('express');

const Constants = require('./constants'),
  helper = require('./helper');

  const googleDrive = require('./googleDrive');

// configure
const app = express();
const server = require('http').Server(app);
const port = 3000;


// endpoints
app.get('/', (req, res) => {
  res.status(200);
  res.json({"message": "server is up and running!"})
  res.end();
});

app.get('/trim', (req, res) => {
  if(req.query.video === undefined) {

    res.status(500);
    res.json({"message": "Invalid params!"})
    res.end();

  } else {

    let startTime = req.query.time || 0;

    helper.downloadFile(req.query.video)
      .then(() => {
        helper.trimVideo(startTime)
          .then(() => {
            helper.uploadTrimmmedVideo()
            res.status(200);
            res.json({
              "message": "video trimmed successfully",
              "url": Constants.UPLOADURL
            });
            res.end();
          })
          .catch((err) => {
            console.log(`[ERROR]: ${err}`);
          })
      })
      .catch((err) => {
        console.log(`[ERROR]: ${err}`);
      })
  }
});


// server
server.listen(port, (err) => {
  if(err) {
    throw err;
  }
  console.log(`Listening on Port ${port}`)
});

module.exports = server;
