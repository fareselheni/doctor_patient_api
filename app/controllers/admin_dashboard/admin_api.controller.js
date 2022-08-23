require("datejs");
const db = require("../../models");
const Scheduler = db.scheduler;
  
    exports.CountAllAppointments =async (req, res) => {
        try {
            var length = await Scheduler.countDocuments({}, function (err, count) {
                if (err){
                    console.log(err)
                }else{
                    return count
                }
            }).clone();
            
            res.json({result: length})


        } catch (error) {
            console.log(error)
        }
        
    };

    exports.CountCanceledAppointments =async (req, res) => {
        try {
            var length = await Scheduler.countDocuments({status:"annulé"}, function (err, count) {
                if (err){
                    console.log(err)
                }else{
                    return count
                }
            }).clone();
            
            res.json({result: length})


        } catch (error) {
            console.log(error)
        }
        
    };


  exports.CountThisweekAppointments =async (req, res) => {
    try {
        var length = await Scheduler.countDocuments({start_date: {
            $gt: Date.today().toISOString(), 
            $lt: Date.today().addWeeks(1).toISOString()
        }}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        res.json({result: length})


    } catch (error) {
        console.log(error)
    }
      
  };


  exports.PourcentageweekAppointments =async (req, res) => {
    try {
        var thisWeek = await Scheduler.countDocuments({start_date: {
            $gt: Date.today().addWeeks(-1).toISOString(), 
            $lt: Date.today().toISOString()
        }}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();

        var lastWeek = await Scheduler.countDocuments({start_date: {
            $gt: Date.today().addWeeks(-2).toISOString(), 
            $lt: Date.today().addWeeks(-1).toISOString()
        }}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();

        var pourcentage;
        if (lastWeek!==0) {
            pourcentage = ((thisWeek-lastWeek)/lastWeek)*100
        } else {
            pourcentage = ((thisWeek-lastWeek)/1)*100
        }
        res.json({result: Math.trunc(pourcentage)})


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.CountTodayAppointments =async (req, res) => {
    try {
        var length = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().toISOString() ,
                $lt: Date.today().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        res.json({result: length})


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.PourcentageTodayAppointments =async (req, res) => {
    try {
        var today = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().toISOString() ,
                $lt: Date.today().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();

        var yesterday = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().addDays(-1).toISOString() ,
                $lt: Date.today().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        var pourcentage;
        if (yesterday!==0) {
            pourcentage = ((today-yesterday)/yesterday)*100
        } else {
            pourcentage = ((today-yesterday)/1)*100
        }
        res.json({result: Math.trunc(pourcentage)})


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.CountThisMonthAppointments =async (req, res) => {
    try {
        var length = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().addMonths(-1).toISOString() ,
                $lt: Date.today().addMonths(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        res.json({result: length})


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.PourcentageMonthAppointments =async (req, res) => {
    try {
        var thisMonth = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().addMonths(-1).toISOString() ,
                $lt: Date.today().addMonths(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();

        var lastMonth = await Scheduler.countDocuments({start_date: {
                $gt:Date.today().addMonths(-2).toISOString() ,
                $lt: Date.today().addMonths(-1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        var pourcentage;
        if (lastMonth!==0) {
            pourcentage = ((thisMonth-lastMonth)/lastMonth)*100
        } else {
            pourcentage = ((thisMonth-lastMonth)/1)*100
        }
        res.json({result: Math.trunc(pourcentage)})


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.CountEveryDayAppointments =async (req, res) => {
    try {
        var monday = await Scheduler.countDocuments({start_date: {
                $gte:Date.monday().toISOString() ,
                $lt: Date.monday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var tuesday = await Scheduler.countDocuments({start_date: {
                $gte:Date.tuesday().toISOString() ,
                $lt: Date.tuesday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var wednesday = await Scheduler.countDocuments({start_date: {
                $gte:Date.wednesday().toISOString() ,
                $lt: Date.wednesday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var thursday = await Scheduler.countDocuments({start_date: {
                $gte:Date.thursday().toISOString() ,
                $lt: Date.thursday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var friday = await Scheduler.countDocuments({start_date: {
                $gte:Date.friday().toISOString() ,
                $lt: Date.friday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var saturday = await Scheduler.countDocuments({start_date: {
                $gte:Date.saturday().toISOString() ,
                $lt: Date.saturday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        res.json({monday:monday,
            tuesday:tuesday,
            wednesday:wednesday,
            thursday:thursday,
            friday:friday,
            saturday:saturday
        })


    } catch (error) {
        console.log(error)
    }
      
  };

  exports.CountEveryMonthAppointments =async (req, res) => {
    try {
        var january = await Scheduler.countDocuments({start_date: {
                $gte:Date.january().addHours(2).toISOString() ,
                $lt: Date.february().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var february = await Scheduler.countDocuments({start_date: {
                $gte:Date.february().addHours(2).toISOString() ,
                $lt: Date.march().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var march = await Scheduler.countDocuments({start_date: {
                $gte:Date.march().addHours(2).toISOString() ,
                $lt: Date.april().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var april = await Scheduler.countDocuments({start_date: {
                $gte:Date.april().addHours(2).toISOString() ,
                $lt: Date.may().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var may = await Scheduler.countDocuments({start_date: {
                $gte:Date.may().addHours(2).toISOString() ,
                $lt: Date.june().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var june = await Scheduler.countDocuments({start_date: {
                $gte:Date.june().addHours(2).toISOString() ,
                $lt: Date.july().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var july = await Scheduler.countDocuments({start_date: {
                $gte:Date.july().addHours(2).toISOString() ,
                $lt: Date.august().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var august = await Scheduler.countDocuments({start_date: {
                $gte:Date.august().addHours(2).toISOString() ,
                $lt: Date.september().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var september = await Scheduler.countDocuments({start_date: {
                $gte:Date.september().addHours(2).toISOString() ,
                $lt: Date.october().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var october = await Scheduler.countDocuments({start_date: {
                $gte:Date.october().addHours(2).toISOString() ,
                $lt: Date.november().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var november = await Scheduler.countDocuments({start_date: {
                $gte:Date.november().addHours(2).toISOString() ,
                $lt: Date.december().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var december = await Scheduler.countDocuments({start_date: {
                $gte:Date.december().addHours(2).toISOString() ,
                $lt: Date.january().toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        
        res.json({january:january,
            february:february,
            march:march,
            april:april,
            may:may,
            june:june,
            july:july,
            august:august,
            september:september,
            october:october,
            november:november,
            december:december
        })


    } catch (error) {
        console.log(error)
    }
      
  };

