const status = require('../constants/statusCodes')
const fs = require('fs')
const logger = require('../logger/NASlogger')
const fname = 'serveFiles.js'
const mime = require('mime-types')

module.exports = {
    serveStaticFile:function(req,res){
        let basePath = req.body.basePath;
        logger.info('Inside serve static file function',fname);
        try{
            fs.readFile(basePath, function (err,data) {
                if (err) {
                  logger.error('File not found ',fname);
                  res.writeHead(404);
                  res.end(JSON.stringify(err));
                  return;
                }
                logger.info('Serving the requested file ',fname)
                res.writeHead(200);
                res.end(data);
              });
        }
        catch(err){
            logger.info('Error in serve static function ',fname);
        }
    },
    viewFile:function(req,res){
        let basePath = req.query.basePath;
        logger.info('Inside serve static file function',fname);
        try{
            fs.readFile(basePath, function (err,data) {
                if (err) {
                  logger.error('File not found ',fname);
                  res.writeHead(404);
                  res.end(JSON.stringify(err));
                  return;
                }
                logger.info('Serving the requested file ',fname)
                let contentType = mime.lookup(basePath);
                logger.info('Mime type of the file '+contentType,fname);
                res.setHeader("Content-Type",contentType);
                res.writeHead(200);
                res.end(data);
              });
        }
        catch(err){
            logger.info('Error in serve static function ',fname);
        }
    },
    triggerDownload:async function(req,res){
        let basePath = req.query.basePath;
        logger.info('Inside trigger download file function',fname);
        let filename = req.query.fileName;
        try{
            let data =await fs.readFileSync(basePath);
            logger.info('Serving the requested file ',fname)
            res.setHeader("Content-Disposition",`attachment; filename=${filename}`)
            res.writeHead(200);
            res.end(data);
        }
        catch(err){
            logger.error('Error in serve static function ',fname);
            res.writeHead(404);
            res.end();
        }
    }
}