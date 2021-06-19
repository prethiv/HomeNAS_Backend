const logs = require('../logger/SystemLog')

module.exports = {
    initNAS:function(){
        logs.intro()
        logs.appInfo()
    }
}