const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema(
    {
        task : {type: String, required : true},
        isChecked :{type: Boolean,default: false}, 
        
    },
    { 
        timestamps: true, strict: false
    }
);

module.exports = mongoose.model('Todo', TodoSchema);