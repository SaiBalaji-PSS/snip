const db = require("../DB/db")
const {userTable} = require("../Model/schema")
const {userRequestValidator,loginBodyValidator} = require("../Utilities/userRequestValidator")
const {generateHashAndSalt,generateJWTToken} = require("../Utilities/userUtilities")
const userModel = require("../Model/userModel")

const signUp = async (req,res) => {
    const validationOutput = await userRequestValidator.safeParseAsync(req.body)
    if(validationOutput.success){
       const {firstName,lastName,email,password} = validationOutput.data
       const {salt,hashedPassword} = generateHashAndSalt(password)
       try{
            //check if user already exist 
            const isUserExist = await userModel.checkIfUserWithEmailAlreadyExist(email)
            console.log(`IS USER EXIST${isUserExist}`)
            if(isUserExist){
                console.log("INSIDE 2")
                return res.status(400).json({isSuccess:false,message:"The user with given email already exist"})
            }
            // if not insert the new user 
             const userToBeInserted = {
                     firstName:firstName,
                     lastName:lastName,
                     email:email,
                     password:hashedPassword,
                     salt:salt
             }
            const insertedUserId = await userModel.insertNewUser(userToBeInserted)
            
            if(insertedUserId){
                 //generate jwt token and sent to client 
                             console.log("tt")
                 const jwtToken = generateJWTToken(insertedUserId)
                 res.status(201).json({isSuccess:true,token:jwtToken})
            }
            else{
                 res.status(500).json({isSuccess:false,message:"Internal server error1"})
            }

       }
       catch(error){
          console.log(error)
          res.status(500).json({isSuccess:false,message:"Internal server error2"})
       }
    }
    else{
        console.log(validationOutput.error.format)
        res.status(400).json({isSuccess:false,message:validationOutput.error.format})
    }
    
}


const logIn = async (req,res) => {
    console.log(req.body)
    const validationResult = await loginBodyValidator.safeParseAsync(req.body)
    if(validationResult.success){
        const {email,password} = validationResult.data
        //check if user exist in db
        try{
            const {matchingUser,isMatching} = await userModel.getMatchingUserFromDB(email,password)
            if(isMatching){
                //generate jwt token and send it to client 
                const jwtToken = await generateJWTToken(matchingUser.id)
                res.status(200).json({isSuccess:true,token:jwtToken})
            }
            else{
                res.status(401).json({isSuccess:false,message:"Invalid email or password"})
            }
        }
        catch(error){
            console.log(error)
            res.status(500).json({isSuccess:false,message:"Internal server error"})
        }
        
       

    }
    else{
        console.log(validationResult.error)
        res.status(400).json({isSuccess:false,message:validationResult.error.format()})
    }

}

module.exports = {signUp,logIn}