const fs = require('fs')
const fname = 'rmdirNAS.js'
const logger = require('../logger/NASlogger')
const status = require('../constants/statusCodes')

module.exports = {
    rmdirNAS:function(req){
        let directoryName = req.body.directoryName;
        let basePath = req.body.basePath
        logger.info('Inside rmDir function',fname)
        logger.info('BasePath :'+basePath+'DirectoryName :'+directoryName,fname)
        try {
            if(!fs.existsSync(basePath+directoryName)){
                logger.error(`${directoryName} does not existed!`,fname)
                return {status:status.ERROR_MAX}
            }
            else{
                fs.rmdirSync(basePath+directoryName, { recursive: true })
                logger.info(`${directoryName} is deleted!`,fname);
                return {status:status.SUCCESS}
            }
        } catch (err) {
            logger.error(`Error while deleting ${directoryName}.`,fname);
            return {status:status.ERROR_MAX}
        }
    },
    rmdirsNAS:function(req){
        let directories = req.body.directories;
        let basePath = req.body.basePath;
        logger.info('Inside remove multiple directories function ',fname);
        try{
            directories.forEach(directory => {
                logger.info('BasePath :'+basePath+' Directory :'+directory,fname)
                try{
                    if(!fs.existsSync(basePath+directory)){
                        logger.info('This directory not exists :'+basePath+directory,fname);
                        return {status:status.LOGICAL_ERROR}
                    }
                    else{
                        logger.info('Removing the directory :'+basePath+directory,fname);
                        fs.rmdirSync(basePath+directory, { recursive: true })
                    }
                }
                catch(err){
                    logger.error('Error while deleting '+basePath+directory,fname)
                    return {status:status.OPERATION_FAILED_IN_MIDDLE}
                }
            });
            return {status:status.SUCCESS}
        }
        catch(err){
            logger.error("Error while deleting multiple directories !!!",fname);
            return {status:status.ERROR_MAX}
        }
    }
}