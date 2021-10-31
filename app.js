const express = require('express');

const path = require('path');

const fs = require('fs');

const app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));

const uri ='mongodb+srv://sajjad:123saji321@cluster0.3c6ba.mongodb.net/myFirstDatabase?';
const {MongoClient, ObjectId} = require("mongodb");
const client = new MongoClient(uri, {useNewUrlParser: true, useUnifiedTopology: true});

console.log('yes');






app.get('/',function (req,res)
{
    client.connect(async err =>
        {
            if (err) throw err;
            const todolist = client.db("mydbname").collection("todolist");
            await todolist.find({}).toArray( (err, tasks) => 
            {     
                if (err) throw err;
                res.render('./todo.ejs',{tasks});
            });
        });
});




app.post('/create-task', function(req, res){

    req.body.isChecked = false;
    client.connect(async err =>
    {
        if (err) throw err;
        const todolist = client.db("mydbname").collection("todolist");
        await todolist.insertOne(req.body, (err, result) =>
        {
            if (err) throw err;
            if(result.acknowledged)
                console.log("task saved");
            else
                console.log("sorry something went wrong");
            res.redirect('/');
        });
    });

});




app.get('/delete-task/:id', (req,res) =>
{
    
    client.connect(async err =>
    {
        const id = 'new ObjectId("' + req.params.id + '.toString()")';
        console.log(req.params);
        if (err) throw err;
        const todolist = client.db("mydbname").collection("todolist");
        todolist.deleteOne({"_id" : new ObjectId(req.params.id)}, (err, result) =>
        {
            if (err) throw err;
            if(result.acknowledged)
                console.log("task has deleted");
            else
                console.log("sorry something went wrong");
            res.redirect('/');
        });
    })
})



app.get('/toggleTodoChecked/:_id/:isChecked', (req,res) =>
{
   
    
    const todolist = client.db("mydbname").collection("todolist");
    const isChecked = req.params.isChecked === 'true';
    todolist.updateOne({"_id" : new ObjectId(req.params._id)}, {$set : {"isChecked" : isChecked}} , (err, result) =>
    {
        if (err) throw err;
        if(result.acknowledged)
            console.log("task updated");
        else
            console.log("sorry something went wrong");
    });
    res.redirect('/');
})




app.listen(3000);
