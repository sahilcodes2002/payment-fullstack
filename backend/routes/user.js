const express = require("express")
const router = express.Router();
const {User, Account} = require("../db")
const mongoose = require("mongoose")
const zod = require("zod");
const jwt = require("jsonwebtoken")
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

const signupSchema = zod.object({
    firstName:zod.string(),
    lastName:zod.string(),
    username:zod.string().email(),
    password:zod.string().min(8)
})

const signinSchema = zod.object({
    username:zod.string().email(),
    password:zod.string()
})

function zodValidateSignIn(obj){
    const validated = signinSchema.safeParse(obj);
    return validated.success;
}

function zodValidateSignUp(obj){
    const validated = signupSchema.safeParse(obj);
    return validated.success;
}

function jwtCreateToken(id){
    const token = jwt.sign({userId:id},JWT_SECRET);
    return token;
}

async function newUser(username){
    const user = await User.findOne({
        username:username
    })
    return user;
}



router.post("/signup", async function(req,res){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;
 
    if(!zodValidateSignUp({
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password
    })){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    const user = await newUser(username)
    if(user){
        return res.status(411).json({
            message:"Email already taken"
        })
        
    }

    const newEntry = await User.create({
        firstName:firstName,
        lastName:lastName,
        username:username,
        password:password
    })

    await Account.create({
        userId:newEntry._id,
        balance:1+ Math.random()*10000
    })
    console.log(newEntry._id);
    const token = jwtCreateToken(newEntry._id);
    res.json({
        message: "User created successfully",
        name:newEntry.firstName,
        token:token
    })
})


router.post("/signin",async function(req,res){
    username = req.body.username;
    password = req.body.password;

    if(!zodValidateSignIn({
        username:username,
        password:password
    })){
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }
    
    const user = await User.findOne({
        username:username,
        password:password
    })

    if(!user){
        return res.status(411).json({
            message:"error while logging in"
        })
    }
    console.log(user._id);
    const token = jwtCreateToken(user._id);
    res.status(200).json({
        name:user.firstName,
        token:token
    })

})


async function updateUser(userId, updates){
    try{
        const result = await User.updateOne({_id:userId},{$set: updates})
        return result;
    }catch(err){
        throw err;
    }
}

const updateSchema = zod.object({
    firstName:zod.string().optional() ,
    lastName:zod.string().optional(),
    password:zod.string().min(8).optional()
})

router.put("/",authMiddleware,async function(req,res){
    const obj = req.body;
    const {success} = updateSchema.safeParse(obj);
    if(!success){
        return res.status(411).json({
            message:"invalid inputs"
        })
    }
    const userId = req.userId;
    const result = await updateUser(userId,obj);
    if(result){
        res.status(200).json({
            message:"updated successfully"
        })
    }else{
        res.status(411).json({
            message:"failed"
        })
    }
})

router.get("/bulk",authMiddleware,async function(req,res){
    const filter = req.query.filter || "";
        const users =await User.find({
            $or: [{
                firstName:{
                    "$regex": filter
                }
            },{
                lastName:{
                    "$regex": filter
                }
            }]
        })

        res.json({
            users: users.map(user=>({
                username:user.username,
                firstName:user.firstName,
                lastName:user.lastName,
                _id:user._id
            }))
        })
})


module.exports = router;