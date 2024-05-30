const JWT_SECRET = require("./config")
const jwt = require("jsonwebtoken")
const {User} = require("./db")


async function authMiddleware(req,res,next){
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
        return res.status(403).json({});
    }
    const words = auth.split(" ");
    const Token = words[1];
    try{
        const decoded = jwt.verify(Token,JWT_SECRET);

        if(decoded.userId){
            req.userId=decoded.userId;
            const resp = await User.findOne({_id:decoded.userId})
            if(resp){
                next();
            }else{
                res.status(403).json({
                    message:"not authorized"
                })
            }

            
        }else{
            res.status(403).json({
                message:"not authorized"
            })
        }
    }catch(err){
        res.status(403).json({
            message:"not authorized"
        })
    }
}

module.exports = authMiddleware;