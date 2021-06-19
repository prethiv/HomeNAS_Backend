const dtTime = require('../utility/dateAndTime')

module.exports={
    info:function(logmsg,filename){
        console.log("INFO     [",dtTime.getDate(),"]  [",dtTime.getTime(),"]",filename,"                  ",logmsg);
    },
    error:function(logmsg,filename){
        console.log("ERROR    [",dtTime.getDate(),"]  [",dtTime.getTime(),"]",filename,"                 ",logmsg);
    }
}