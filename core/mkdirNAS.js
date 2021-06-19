const fs = require('fs')
const logger = require('../logger/NASlogger')
const fname = 'mkdirNAS.js'
const status = require('../constants/statusCodes')

module.exports = {
    newDir:function(req){
        logger.info('Inside the newDir function',fname);
        let newDirName = req.body.directoryName
        let basePath = req.body.basePath
        logger.info('NewDirname :'+newDirName+' basePath :'+basePath,fname)
        try{
            if(!fs.existsSync(basePath+newDirName)){
                logger.info('Directory does not exists',fname)
                try{
                    logger.info('Creating a new directory',fname)
                    if(!fs.mkdirSync(basePath+newDirName)){
                        logger.info('Successfully created a new directory',fname)
                        return {status:status.SUCCESS}
                    }
                    else{
                        logger.error('Error creating a new directory',fname)
                        return {status:status.ERROR}
                    }
                }
                catch(err){
                    logger.error('Unexpected error while creating a new directory',fname)
                    return {status:status.ERROR_MAX};
                }
            }
            else{
                logger.error('Directory with same name already exists',fname)
                return {status:status.LOGICAL_ERROR};
            }
        }
        catch(err){
            logger.error('Unexpected error inside newDir',fname)
            return {status:status.ERROR};
        }
    }
 }