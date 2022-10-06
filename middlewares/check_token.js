const jwt = require("jsonwebtoken");

let checkToken = (req,res,next) => {
    let token = req.headers["authorization"];
    token = token.slice(7, token.length);
    if(token){
        jwt.verify(token, "secret-long-key",(err,decoded) => {
            if(err){
                res.status(401).json({
                    msg: "Invalid Token",
                    status: false
                })
            }
            else {
                req.decoded = decoded;
                console.log(decoded);
                next();
            }
        })
    }
    else {
        res.json({
            msg:"Token is not provided"
        })
    }
}


module.exports = {checkToken: checkToken};