const db = require("../models");
const User = db.users;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {Op} = require("sequelize");

exports.register = async(req,res) => {
    const {username, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10);

    let token = jwt.sign({username: req.body.username}, "secret-long-key", {
        expiresIn : "1h"
    })

    await User.findOne({
        where: {
            email,
            [Op.or]: [
                {
                  email:req.body.email
                }
            ]
        }
    })
    .then((result) => {
        if(!result){
            User.create({
                username:username,
                password:hashedPass,
                email:email
            })
            .then((result) => {
                res.status(200).send({data:result, token:token});
                console.log("USer added");
            }).catch((err) => {
                console.log(err);
            });
        }else {
            return res.status(404).json("Email already exists!!")
        }
    }).catch((err) => {
        console.log(err);
    });
}

exports.login = async(req,res) => {
    const {username, password} = req.body;
    const user = await User.findOne({
        where: {username: username}
    });

    try {
        if(!user){
            return res.status(404).send("No user found with the given username")
        }else {
            let isCorrect = await bcrypt.compare(password, user.password)    
            if(!isCorrect){
                res.status(400).send("Email or password is incorrect!!")
            }else {
                let token = await jwt.sign({username: req.body.username},
                    "secret-long-key", {
                        expiresIn: "1h"
                    }    
                )
                res.status(200).json({
                    user:user,
                    token: token
                })
            }
        }
    } catch (error) {
        console.log(error);
        res.send(error.message)        
    }
}

// exports.changePass = async(req,res) => {
//     const user = await User.findOne({where: {id: req.params.id}});
//     const hashedPass = await bcrypt.hash(user.password, 10);

//     User.update({
//         password: hashedPass
//     },
//     {
//         where: {id: req.params.id}
//     })
//     .then((result) => {
//         res.status(200).json(result)
//     })
//     .catch(err => {
//         res.send(err.message);
//     })
// }