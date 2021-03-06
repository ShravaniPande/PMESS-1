const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const EquipmentDetails = require('../../model/equipment-details');
const MaintenanceSchedule = require('../../model/maintenance-schedule');
const RepairLog = require('../../model/repair-log');

// API to create a new equipment entry
router.post('/userActivity', (req, res) => {
    const mech_id = req.body.query.mechanic_id
    const start = req.body.query.start
    const end = req.body.query.end
    const output = []
    console.log('query',req);
    MaintenanceSchedule.find({$and:[{ maintenanceComplete: true},{mechanic_id: mech_id},{maintenanceCompleteDate:{$gte:start, $lte:end}}]}).exec()
        .then(result => {
            output.push({"PM":result})  
        }).then(() => {
             RepairLog.find({$and:[{mechanic_id:mech_id},{isComplete:true},{reviewedDate:{$gte:start, $lte:end}}] }).exec()
            .then(result => {
                output.push({"Repair":result})
            })
            .then(() => {
                MaintenanceSchedule.find({$and:[{ reviewOk: true},{reviewedBy: mech_id},{reviewedDate:{$gte:start, $lte:end}}]}).exec()
                .then(result => {
                        output.push({"Reviews":result})
                        res.status(200).json({
                            success: true,
                            message: "User activity successful",
                            result:output
                        })
                })
                .catch(err => {
                    res.status(202).json({
                        success: false,
                        message: "User activity failed"
                    })
                })
            })
        })
})

const allPM = () =>{

}
router.post('/pmreviewreport',(req,res) => {
    
    const {start, end, taskType, completionType} = req.body.query;

    // const mech_id = req.body.query.mechanic_id
    // const start = req.body.query.start
    // const end = req.body.query.end
    // const output = []
    if(taskType == "PM"){
        if(completionType == "All")
        {
            MaintenanceSchedule.find({maintenanceCompleteDate:{$gte:start, $lte:end}}).exec()
            .then(result => {
                // console.log("All: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
        if(completionType == "On Time"){
            MaintenanceSchedule.find({$and:[{maintenanceComplete:true},{isDelayed:false},{maintenanceCompleteDate:{$gte:start, $lte:end}}]}).exec()
            .then(result => {
                // console.log("On Time: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
        if(completionType == "Delayed"){
            MaintenanceSchedule.find({$and:[{maintenanceComplete:true},{isDelayed:true},{maintenanceCompleteDate:{$gte:start, $lte:end}}]}).exec()
            .then(result => {
                // console.log("Delayed: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
    }
    if(taskType == "Review"){
        if(completionType == "All")
        {
            MaintenanceSchedule.find({reviewedDate:{$gte:start, $lte:end}}).exec()
            .then(result => {
                // console.log("All REVIEWWW: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
        if(completionType == "On Time"){
            MaintenanceSchedule.find({$and:[{reviewOk:true},{reviewDelayed:false},{reviewedDate:{$gte:start, $lte:end}}]}).exec()
            .then(result => {
                // console.log("On Time REVIEWWW: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
        if(completionType == "Delayed"){
            MaintenanceSchedule.find({$and:[{reviewOk:true},{reviewDelayed:true},{reviewedDate:{$gte:start, $lte:end}}]}).exec()
            .then(result => {
                // console.log("Delayed REVIEWWW: ",result);
                res.status(200).json({
                    success: true,
                    result: result,
                    message: "Maintenance Schedules found"
                })
            }).catch(err => {
                res.status(202).json({
                    success: false,
                    message: "Maintenance Schedules not found"
                })
            });
        }
    }

})

module.exports = router;