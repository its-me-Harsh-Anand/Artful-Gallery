const router = require('express').Router()

let User = require('../models/user.model')

router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
    .then(user => {
        const returnUser = {
            username : user.username,
            id : user._id
        }
        return returnUser
    })
    .then(returnUser => res.json(returnUser))
    .catch(err => res.json({message: "User not found", stat: false}))
})





router.route('/register').post((req, res)=>{
    const username = req.body.username
    const password = req.body.password
    
    
    const existingUser = findUser(username, (error, userFound)=> {
            console.log("User found",userFound)    
     });
    
    
    if(existingUser !=null){
        res.json({message: "Already existing", stat: false})
    }else{
        const newUser = new User(
            {
                username,
                password
            }
            )

            newUser.save()
            .then((user)=> res.json({message: "Thanks for registering with us", stat: true, id:user._id}))
        .catch(err => res.status(400).json({message: "User Already Exists", stat: false}))
    }
    
})


function findUser(username, callback){
    User.findOne({username: username}, function(err, userObj){
        if(err){
            return callback(err);
        } else if (userObj){
            return callback(null,userObj);
        } else {
            return callback();
        }
    });
}

module.exports = router