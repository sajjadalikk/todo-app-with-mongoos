const express = require('express');

const path = require('path');

const fs = require('fs');

const app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));
 
const Todo = require('./models/todo.js');

const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: true }));

const uri ='mongodb+srv://sajjad:123saji321@cluster0.3c6ba.mongodb.net/myFirstDatabase?';

console.log('yes');


(async () => {
    await mongoose.connect(uri);
    console.log('connected');
  })();

  app.get('/', async (req, res) => {
  const tasks = await Todo.find();
    res.render('./todo.ejs', {tasks});
});








app.post('/create-task', function(req, res){

    var list = new Todo({
        task: req.body.task,
      
    })
      
   list.save(function(err,result){
        if (err){
            console.log(err);
        }
        else{
            console.log(result)
            res.redirect('/');
        }
    })

});


app.get('/delete-task/:id', (req,res) =>
{
    Todo.remove({_id: req.params.id}, function(err){
        if(err) res.json(err);      
          res.redirect('/');
      });
})



app.get('/toggleTodoChecked/:_id/:isChecked', (req,res) =>
{
    Todo.findById(req.params._id, function(err, p) {
        if (!p)
          return next(new Error('Could not load Document'));
        else {
          // do your updates here
          p.isChecked = req.params.isChecked;
      
          p.save(function(err) {
            if (err)
              console.log('error')
            else
              console.log('success')
              res.redirect('/');
          });
        }
      });
    
  

    
})




app.listen(3000);
