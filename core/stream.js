const logger = require('../logger/NASlogger')
const fs = require('fs')
const fname = 'stream.js'
const mime = require('mime-types')


module.exports = {
    loadVideoPlayer:function(req,res){
        fs.readFile("./utility/videoplayer.html", function (err,data) {
            if (err) {
              logger.error('File not found Videoplayer.html',fname);
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            logger.info('Serving the requested file videoplayer.html ',fname)
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            data=data.toString('utf-8').replace("${videoname}",req.query.name);
            res.end(data);
          });
    },
    streamVideoPlayer:function(req,res){
        console.log(req.query.name,"Video name");
        const range = req.headers.range;
        if (!range) {
          logger.error('Range is not there in the request',fname);
          res.status(400).send("Requires Range header");
        }
        const videoPath = req.query.name;
        const videoSize = fs.statSync(req.query.name).size;
        logger.info("Video Path :"+videoPath+" Video Size : "+videoSize,fname);
        const CHUNK_SIZE = 10 ** 6; 
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
        const contentLength = end - start + 1;
        let contentType = mime.lookup(videoPath);
        const headers = {
          "Content-Range": `bytes ${start}-${end}/${videoSize}`,
          "Accept-Ranges": "bytes",
          "Content-Length": contentLength,
          "Content-Type": contentType,
        };
        // HTTP Status 206 for Partial Content
        res.writeHead(206, headers);
        const videoStream = fs.createReadStream(videoPath, { start, end });
        videoStream.pipe(res);
    },
    loadAudioPlayer:function(req,res){
          fs.readFile("./utility/audioplayer.html", function (err,data) {
            if (err) {
              logger.error('File not found audioplayer.html',fname);
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            logger.info('Serving the requested file audioplayer.html ',fname)
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            data=data.toString('utf-8').replace("${audioname}",req.query.name);
            res.end(data);
          });
    },
    streamAudioPlayer:function(req,res){
            console.log(req.query.name,"Audio name");
            const range = req.headers.range;
            if (!range) {
              logger.error('Range is not there in the request',fname);
              res.status(400).send("Requires Range header");
            }
            const videoPath = req.query.name;
            const videoSize = fs.statSync(req.query.name).size;
            logger.info("Video Path :"+videoPath+" Video Size : "+videoSize,fname);
            let CHUNK_SIZE = 10 ** 6;
            CHUNK_SIZE=CHUNK_SIZE/8; 
            const start = Number(range.replace(/\D/g, ""));
            const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
            const contentLength = end - start + 1;
            let contentType = mime.lookup(videoPath);
            const headers = {
              "Content-Range": `bytes ${start}-${end}/${videoSize}`,
              "Accept-Ranges": "bytes",
              "Content-Length": contentLength,
              "Content-Type": contentType,
            };
            // HTTP Status 206 for Partial Content
            res.writeHead(206, headers);
            const videoStream = fs.createReadStream(videoPath, { start, end });
            videoStream.pipe(res);
    }
}