const fname='renameNAS.js'
const fs = require('fs')
const logger = require('../logger/NASlogger')
const status = require('../constants/statusCodes')


module.exports = {
    rename:function(req){
        let fileToRenamePath = req.body.path;
        let newName = req.body.newName;
        logger.info('Inside the rename function ',fname)
        logger.info('Old fileName '+fileToRenamePath+' New fileName '+newName,fname)
        try {
            if(!fs.existsSync(fileToRenamePath)){
                logger.error('File or folder does not exists '+fileToRenamePath,fname);
                return {status:status.LOGICAL_ERROR}
            }
            else{
                logger.info('Renaming File or Folder '+fileToRenamePath,fname);
                fs.renameSync(fileToRenamePath,newName);
                logger.info('File renamed successfully !!!')
                return {status:status.SUCCESS}
            }   
        } catch (error) {
            logger.error('Error while renaming a file or folder ',fname)
            return {status:status.ERROR_MAX}
        }
    },
    moveaFile:function(req){
        let fileToRenamePath = req.body.path;
        let newName = req.body.newName;
        logger.info('Inside the move function ',fname)
        logger.info('Old filePath : '+fileToRenamePath+' New filePath : '+newName,fname)
        try {
            if(!fs.existsSync(fileToRenamePath)){
                logger.error('File or folder does not exists '+fileToRenamePath,fname);
                logger.info('Aborting moving operation ',fname)
                return {status:status.LOGICAL_ERROR}
            }
            else{
                logger.info('Moving File or Folder '+fileToRenamePath,fname);
                fs.renameSync(fileToRenamePath,newName);
                logger.info('File Moved successfully !!!')
                return {status:status.SUCCESS}
            }   
        } catch (error) {
            logger.error('Error while moving a file or folder ',fname)
            return {status:status.ERROR_MAX}
        }
    },
    moveMultipleFiles:function(req){
        let filesAndFolders = req.body.filesAndFolders;
        let basePath = req.body.basePath;
        let newPath = req.body.newPath;
        logger.info('Inside move multiple files function ',fname);
        logger.info('FilesAndFolders :'+filesAndFolders+' BasePath : '+basePath+' NewPath : '+newPath,fname);
        try{
            filesAndFolders.forEach(element => {
                    let oldpath = basePath+element;
                    let pathtoMove = newPath+element;
                    if(!fs.existsSync(oldpath)){
                        logger.error('Files or folder path does not exists OldPath :'+oldpath+' NewPath :'+pathtoMove,fname);
                        return {status:status.OPERATION_FAILED_IN_MIDDLE}
                    }
                    else{
                        logger.info('Moving a file or folder from '+oldpath+' to '+pathtoMove,fname);
                        fs.renameSync(oldpath,pathtoMove);
                    }
            });
            return {status:status.SUCCESS}
        }
        catch(err){
            logger.error('Error while moving multiple files or folders',fname);
            return {status:status.OPERATION_FAILED_IN_MIDDLE}
        }
    }
}