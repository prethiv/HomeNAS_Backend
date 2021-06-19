module.exports = {
    intro: function () {
        console.log('*************************************************')
        console.log('   ##    #   #    ####                                  ')
        console.log('   #  #  #  ###   #___                                   ')
        console.log('   #   ##  #   #  ___#            V 1.0.0                       ')
        console.log('*************************************************')
    },
    appInfo:function(){
        require('dotenv').config()
        let port = process.env.PORT
        console.log('\n')
        console.log('**************************************************')
        console.log(' APP INFO                                       ')
        console.log('   Running Port :',port,'                         ')
        console.log('                                                ')
        console.log('*************************************************')
    }
};