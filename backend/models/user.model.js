const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aboutSchema = new Schema(
    {
        fullname : {
            type : String,
            trim : true
        },
        email : {
            type : String,
            trim : true
        },
        contact : {
            type : String,
            trim : true
        },
        description : {
            type : String,
            trim : true
        }
    }
)

const userSchema = new Schema(
    {
        username : {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        password : {
            type: String,
            required: true,
            trim: true
        },
        about : {
            type: aboutSchema        
        },
        posts : [String]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User