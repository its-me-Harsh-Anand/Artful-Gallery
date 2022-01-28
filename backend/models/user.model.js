const mongoose = require('mongoose')

const Schema = mongoose.Schema

const aboutSchema = new Schema(
    {
        fullname : {
            type : String
        },
        email : {
            type : String
        },
        contact : {
            type : String
        }
    }
)

const userSchema = new Schema(
    {
        username : {
            type: String,
            unique: true,
            required: true
        },
        password : {
            type: String,
            required: true
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