const router = require('express').Router()

let User = require('../models/user.model')

//Getting all posts
router.route('/allposts').get((req, res)=>{
    User.find()
    .then(user =>{
        let posts = []
        user.forEach(entry =>{
            posts.push(...entry.posts)
        })
        return posts
    }).then(posts=> res.json(posts))
    .catch(err => res.json({messsage: "Fetching all posts failed", stat: "false", error: err}))
})

//Getting user details by id
router.route('/:id').get((req, res)=>{
    User.findById(req.params.id)
    .then(user => {
        const returnUser = {
            username : user.username,
            id : user._id,
            about : {
                fullname : user.about.fullname,
                email : user.about.email,
                number : user.about.contact
            },
            posts : user.posts
        }
        return returnUser
    })
    .then(returnUser => res.json(returnUser))
    .catch(err => res.json({message: "User not found", stat: false, error: err}))
})

// Finding user by username

router.route('/username/:username').get((req, res)=>{
    findUser(req.params.username, (err, user)=>{
        if(user){
            res.json(user)
        }else{
            res.json({message: "User not found",stat: false, error: err})
        }
    })

})

// Registering new user

router.route('/register').post((req, res)=>{
    const username = req.body.username
    const password = req.body.password
    const about = {
        fullname: "",
        email: "",
        contact: ""
    }
    
        const newUser = new User(
            {
                username,
                password,
                about
            }
            )

            newUser.save()
            .then((user)=> res.json({message: "Thanks for registering with us", stat: true, id:user._id}))
        .catch(err => res.status(400).json({message: "User Already Exists", stat: false}))
    
    
})


//Updating about section of user

router.route('/update/about/:id').post((req, res)=>{

    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        user.about.fullname = req.body.fullname,
        user.about.email = req.body.email,
        user.about.contact = req.body.contact

        user.save()
        .then(()=> res.json({message : "About Section updated"}))
        .catch((err)=> res.json({message : "Error while updating", error : err, stat: true}))
    })
    .catch((err)=> {
        console.log(err)
        res.json({message: "Error in finding user while updating about section", stat : true, error : err})
    })
})



// Adding posts to post section of user

router.route('/update/posts/:id').post((req, res)=>{
    User.findByIdAndUpdate(req.params.id)
    .then(user => {
        user.posts = [...user.posts, req.body.post]

        user.save()
        .then(()=> res.json({message : "New post added"}))
        .catch((err)=> res.json({message : "Error while adding new post", error : err}))
    })
    .catch((err)=> res.json({message: "Error in finding user while adding new post", stat : false, error : err}))
})



// Function for finding existing user
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