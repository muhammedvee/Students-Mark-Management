const express=require('express')
const router = express.Router()
const MongoClient = require('mongodb')

router.get('/',function(req,res,next){
    res.render('search-marks')
})


router.post('/',function(req,res,next){
    // res.send('search in porcess')
    MongoClient.connect('mongodb://127.0.0.1:27017',{userUnifiedTropology:true},function(err,client){
        if(err){
            console.log('error');
        }else{
            // console.log('databace connected'); 
            var searchValue=req.body.searchValue;
            var marks=client.db('SMM').collection('marks');
            

            // var result = marks.findOne({regNo:searchValue})
            // res.render('mark-view',result)
            // console.log(result);
            

            marks.findOne({regNo:searchValue},function(err,result){
                if(err){
                    console.log('error');
                }else{
                    // res.send(result)
                    let marks = result.stMarks
                    
                    var marksArr = Object.entries(marks).map(([subject,mark])=>({
                        subject,
                        mark
                }))
                    console.log(marksArr);

                    res.render('mark-view',{student:result,myMarks:marksArr})
                    // console.log(result);
                    
                }
            })

            // marks.findOne({ regNo: searchValue }, function (err, result) {
            //     if (err) {
            //         console.error('Error fetching data:', err);
            //         res.render('error', { message: 'Error fetching data', error: err });
            //     } else if (!result) {
            //         res.render('mark-view', { error: 'No student found with this registration number.' });
            //     } else {
            //         res.render('mark-view', { student: result });
            //     }
            // });
            


        }
    })
})

module.exports=router;