const {randomBytes,createHmac} = require("node:crypto")
const jwt = require("jsonwebtoken")

const generateHashAndSalt = (password) => {
    const salt = randomBytes(256).toString("hex")
    const hashedPassword = createHmac("sha256",salt).update(password).digest("hex")
    return {salt,hashedPassword}
}

const generateHashForPassword = (password,salt) => {
    const hashedPassword = createHmac("sha256",salt).update(password).digest("hex")
    return hashedPassword
}

const generateJWTToken = (userId) => {
    const token = jwt.sign({id:userId},process.env.SECRETKEY,{expiresIn:"360h"})
    return token
}

const validateJWT = (token) => {
    const payload = jwt.verify(token,process.env.SECRETKEY)
    return payload
}


module.exports = {generateHashAndSalt,generateJWTToken,generateHashForPassword,validateJWT}