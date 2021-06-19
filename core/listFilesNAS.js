const fs = require('fs')
const logger = require('../logger/NASlogger')
const fname = 'listFilesNAS.js'

module.exports = {
    listFiles:function(req){
        logger.info("Inside ListOfFiles Present Function",fname)
        let basePath = req.body.basePath
        logger.info('Basepath :'+basePath,fname)
        try {
            logger.info('Reading files and folder name ',fname)
            const files = fs.readdirSync(basePath);
            let listofdata=[];
            files.forEach(file => {
                listofdata.push(file)
            });
            return listofdata;
        } catch (err) {
            logger.error('Error while retrieving listOFFiles',fname);
            return [];
        }
    }
}