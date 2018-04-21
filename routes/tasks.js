var express = require('express');

var mongojs = require("mongojs");
var db = mongojs('mongodb://torki:286825@ds159187.mlab.com:59187/mytasks',['tasks']);


var router = express.Router();

router.get('/tasks',function(req,res,next){
    db.tasks.find(function(err,tasks){
        if(err)
        {
            res.send("ERROR : " + err);
        }
        res.json(tasks);
    });
});

router.get('/task/:id',function(req,res,next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send("ERROR : " + err);
        }
        res.json(task);
    })
});

router.post('/task',function(req,res,next){
    var title = req.body.title;
    var isDone = req.body.isDone;
    console.log("Title : " + title);
    console.log("isDone : " + isDone);
    if(title !==null && isDone !==null){
        db.tasks.save({"title":title,"isDone":isDone},function(err,task){
            if(err)
            {
                res.send("Error " + err);
            }
            if(task)
            {
                res.json({"saved":'successfully',"task":task});
            }
        });
    }
    else
    {
        res.status = (400);
        res.json({"Error":"Bad Data"});
    }
});


router.delete('/task/:id',function(req,res,next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)},function(err,task){
        if(err){
            res.send("ERROR : " + err);
        }
        res.json(task);
    })
});

router.put('/task/:id',function(req,res,next){
    var title = req.body.title;
    var isDone = req.body.isDone;
    var updTask ={};
    console.log("Title : " + title);
    console.log("isDone : " + isDone);
    if(title !==null && isDone !==null){
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)},{"title":title,"isDone":isDone},{},function(err,task){
            if(err)
            {
                res.send("Error " + err);
            }
            if(task)
            {
                res.json({"saved":'successfully',"task":task});
            }
        });
    }
    else
    {
        res.status = (400);
        res.json({"Error":"Bad Data"});
    }
});

module.exports = router;