const express = require('express')
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

// var {User} = require('../model/User')

var {User} = require('/Mongoose/model/User')

router.get('/',(req,res)=>{
    User.find((err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('The users information could not be retrieved:'+ JSON.stringify(err,undefined,2));}
    })
})

router.get('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send('The user with the specified ID does not exist.')
    
    User.findById(req.params.id,(err,docs) =>{
        if(!err){res.send(docs);}
        else{console.log('The users information could not be retrieved:'+JSON.stringify(err,undefined,2));}
    })
})

router.post('/',(req,res)=>{
    var usr = new User({
        name: req.body.name, // String, required
        email: req.body.email,  // String, required
        age: req.body.age,
        prograd_id: req.body.prograd_id,
        squad: req.body.squad
    });

    usr.save((err,docs)=>{
        if(!err){res.send(docs)}
        else{console.log('There was an error while saving the user to the database'+JSON.stringify(err,undefined,2));}
    })
})

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(500).send('The user with the specified ID does not exist.')

        var usr = new User({
            name: req.body.name, // String, required
            email: req.body.email,  // String, required
            age: req.body.age,
            prograd_id: req.body.prograd_id,
            squad: req.body.squad
        });

        User.findByIdAndUpdate(req.params.id,{$set:usr},{new:true},(err,docs)=>{
            if(!err){res.send(docs)}
            else{console.log('The user information could not be modified.'+JSON.stringify(err,undefined,2));}
        })

})

router.delete('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(404).send('The user with the specified ID does not exist.')

        User.findByIdAndRemove(req.params.id,(err,docs)=>{
            if(!err){res.send(docs)}
            else{console.log('The user could not be removed'+JSON.stringify(err,undefined,2));}
        })
})
module.exports = router;