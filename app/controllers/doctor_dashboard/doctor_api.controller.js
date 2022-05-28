require("datejs");
const db = require("../../models");
const ModelController = require('../model.controller');
const Prescription = db.prescription;
const Scheduler = db.scheduler;
  
  exports.CountThisweekAppointments =async (req, res) => {
    const doctor_id =req.query.doctor_id
    try {
        var length = await Scheduler.countDocuments({doctor_id:doctor_id,start_date: {
            $gt: Date.today().addWeeks(-1).toISOString(), 
            $lt: Date.today().toISOString()
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
    const doctor_id =req.query.doctor_id
    try {
        var thisWeek = await Scheduler.countDocuments({doctor_id:doctor_id,start_date: {
            $gt: Date.today().addWeeks(-1).toISOString(), 
            $lt: Date.today().toISOString()
        }}, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();

        var lastWeek = await Scheduler.countDocuments({doctor_id:doctor_id,start_date: {
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
    const doctor_id =req.query.doctor_id
    try {
        var length = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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
    const doctor_id =req.query.doctor_id
    try {
        var today = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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

        var yesterday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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
    const doctor_id =req.query.doctor_id
    try {
        var length = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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
    const doctor_id =req.query.doctor_id
    try {
        var thisMonth = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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

        var lastMonth = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
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
    const doctor_id =req.query.doctor_id
    try {
        var monday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().monday().toISOString() ,
                $lt: Date.last().monday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var tuesday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().tuesday().toISOString() ,
                $lt: Date.last().tuesday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var wednesday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().wednesday().toISOString() ,
                $lt: Date.last().wednesday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var thursday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().thursday().toISOString() ,
                $lt: Date.last().thursday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var friday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().friday().toISOString() ,
                $lt: Date.last().friday().addDays(1).toISOString() ,
            }
        }, function (err, count) {
            if (err){
                console.log(err)
            }else{
                return count
            }
        }).clone();
        var saturday = await Scheduler.countDocuments({doctor_id:doctor_id
            ,start_date: {
                $gte:Date.last().saturday().toISOString() ,
                $lt: Date.last().saturday().addDays(1).toISOString() ,
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

