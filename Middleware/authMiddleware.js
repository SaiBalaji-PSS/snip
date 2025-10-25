const {validateJWT} = require("../Utilities/userUtilities")


const validateJWTToken = (req,res,next) => {
    const authHeader = req.headers["authorization"]
    const token = authHeader.split(" ")[1]
    if(token == null){
        return res.status(400).json({isSuccess:false,message:"Invalid token"})
    }
    try{
          const payload = validateJWT(token)
          console.log(`REQ TO MIDDLEWARE IS ${req.body}`)
          req.user = payload
          next()
    }
    catch(error){
        console.log(error)
        if(error.name === "TokenExpiredError"){
            return res.status(401).json({isSuucess:false,message:"Token has expired"})
        }
        res.status(500).json({isSuccess:false,message:"Internal server error"})
    }
}
module.exports = {validateJWTToken}