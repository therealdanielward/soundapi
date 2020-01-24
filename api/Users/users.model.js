var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var usersSchema = new Schema({
    // _id :{
    //     type: mongoose.SchemaTypes.ObjectId,
    //     unique : true,
    //     required : true
    // },
    Title :{
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    Firstname :{
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    Lastname :{
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    Login :{
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    Password :{
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    Birthdate : {
        type: mongoose.SchemaTypes.Date,
        unique : false,
        required : true
    },
    Location : {
        type: mongoose.SchemaTypes.String,
        unique : false,
        required : true
    },
    DateCreated : {
        type: mongoose.SchemaTypes.Date,
        unique : false,
        required : true
    }
});

module.exports = usersSchema;