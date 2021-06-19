module.exports={ 
    getDate:function(){
        let currentDate = new Date();
        let cDay = currentDate.getDate()
        let cMonth = currentDate.getMonth() + 1
        let cYear = currentDate.getFullYear()
        let dateandtime='';
        dateandtime+=cDay;
        dateandtime+='-';
        dateandtime+=cMonth;
        dateandtime+='-';
        dateandtime+=cYear;
        let filename='dateAndTime.js'
        // console.log("NASLOGGER     ",filename,"                    ",dateandtime);
        return dateandtime;
    },
    getTime:function(){
        let currentDate = new Date();
        let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
        return time;
    }
}