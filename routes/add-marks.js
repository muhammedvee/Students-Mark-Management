
const MongoClient = require('mongodb')
var express = require('express');
var router = express.Router();
// var popup = require('popups');


router.get('/',function(req,res,next){
    res.render('add-marks')
})
router.post('/',function(req,res,next){
        MongoClient.connect('mongodb://127.0.0.1:27017',{userUnifiedTropology:true},function(err,client){
        if(err){
            console.log('error');
        } else{
            // console.log('connected');

            var dataEntered = {
                regNo:req.body.regNo,
                stName:req.body.stName,
                stClass:req.body.stClass,
                stMarks:{
                    maths:req.body.maths,
                    english:req.body.english,
                    science:req.body.science,
                    IT:req.body.IT,
                    social:req.body.social
                }
            }

            client.db('SMM').collection('marks').insertOne(dataEntered,function(err,result){
                if(err){
                    console.log('Error inserting data',err);
                    res.render('error',{message:'Error in inserting data: ',error:err});
                } else{
                    res.redirect('/')
                }
            })
        }
    })
})

module.exports=router;