var status = 0;
var fileInfo;
const fs = require('fs');
const fname = 'uploader.js'
const logger = require('../logger/NASlogger')

module.exports={
    checkstatus:function(req,res){
        res.writeHead(200);
        res.end(status.toString());
        return;
    },
    getFileName:function(req,res){
        fileInfo = req.body.value;
        console.log(fileInfo)
        // logger.info(fileInfo,fname)
        res.writeHead(200);
        res.end('file info received');
    },
    loadfileUploaderPage:function(req,res){
        fs.readFile("./utility/fileuploader.html", function (err,data) {
            if (err) {
              logger.error('File not found fileuploader.html',fname);
              res.writeHead(404);
              res.end(JSON.stringify(err));
              return;
            }
            logger.info('Serving the requested file fileuploader.html ',fname)
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            data=data.toString('utf-8').replace("${basePath}",req.query.basePath);
            res.end(data);
          });
    },
    uploader:function(request,response){
        status = 0;
        let longPoll = setInterval(function(){
            if(fileInfo===undefined){
                console.log('Waiting for file info to receive')
            }
            else{
                let basePath = request.query.basePath;
                var outputFile = fs.createWriteStream(basePath);
                var total = request.headers['content-length'];
                var progress = 0;

                request.on('data', function (chunk) {
                    progress += chunk.length;
                    var perc = parseInt((progress / total) * 100);
                    console.log('percent complete: ' + perc + '%\n');
                    status = perc;
                });

                request.on('error',function(err){
                    console.log('error while uploading')
                })

                request.pipe(outputFile);

                request.on('end', function () {
                    response.end('\nArchived File\n\n'+'total '+total+' progress '+progress);
                });
                clearInterval(longPoll)
            }
        },100)
        
    }
}