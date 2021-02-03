const http = require('https'),
  fs = require('fs'),
  ffmpegPath = require('@ffmpeg-installer/ffmpeg').path,
  ffmpeg = require('fluent-ffmpeg');

const Constants = require('./constants'),
  googleDrive = require('./googleDrive');

ffmpeg.setFfmpegPath(ffmpegPath);

const downloadFile = (url) => {
  return new Promise((resolve) => {
    let file = fs.createWriteStream(Constants.FILENAME);

    const request = http.get(url, function(response) {
      response.pipe(file);
      response.on('end', () => {
        console.log('File downloaded')
        resolve();
      });
    });
  });
}

const trimVideo = (startTime) => {
  return new Promise((resolve, reject) => {
    ffmpeg(Constants.FILENAME)
      .setStartTime(startTime)
      .setDuration(Constants.DURATION)
      .output("TrimmedVideo.mp4")
      .on('end', (err) => {
        if(!err) {
          console.log("Video trimmed successfully");
          resolve();
        }
      })
      .on('err', (err) => {
        reject(err);
      }).run();
  });
}

const uploadTrimmmedVideo = (url) => {
  googleDrive.uploadFileToDrive()
  console.log("File upload started");
}

module.exports = {
  downloadFile,
  trimVideo,
  uploadTrimmmedVideo
}
