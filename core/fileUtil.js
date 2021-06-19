const logger = require('../logger/NASlogger');
const fname = 'fileUtil.js'
const fs = require('fs');
const byteSize = require('byte-size')

module.exports={
    getFileInfo:function(req,res){
            logger.info('Inside getFileInfo Function ',fname)
            let fileinfo = fs.statSync(req.query.basePath)
            // byteSize(1580)
            fileinfo.desc={}
            fileinfo.desc.size=byteSize(fileinfo.size)
            fileinfo.desc.timeCreated = fileinfo.ctime;
            fileinfo.desc.timeModified = fileinfo.mtime;
            res.send(fileinfo)
    }
}