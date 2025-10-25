const urlModel = require("../Model/urlModel")
const {validateUrlRequestBody} = require("../Utilities/urlRequestValidator")
const {nanoid} = require("nanoid")

const saveUrlToDB = async (req,res) => {
    try{
        console.log(req.body)
        console.log(req.user)
         const validationResult = await validateUrlRequestBody.safeParseAsync(req.body)
         console.log(validationResult)
         if(validationResult.success){
            const {targetUrl,shortCode} = validationResult.data
            const urlData = {
                targetURL: targetUrl,
                shortCode: shortCode ??  nanoid(4),
                userId: req.user.id
            }
            const insertedData = await urlModel.insertUrlData(urlData)
            res.status(200).json({isSuccess:true,insertedData})
         }
         else{
            console.log(validationResult.error.errors)
            res.status(400).json({
                    isSuccess: false,
                    message: "Invalid request body 2",
                    errors: validationResult.error, 
            });
         }
    }
    catch(error){
        console.log(error)
        res.status(500).json({isSuccess:false,message:"Internal server error"})
    }
}

const redirectToTargetUrl = async(req,res) => {
    const shortCode = req.params.shortCode
    if(shortCode == null){
        return res.status(400).json({isSuccess:false,message:"Short code not found"})
    }
    try{
        const matchingData = await urlModel.getMatchingTargetUrlForShortCode(shortCode)
        if(matchingData == null){
            return res.status(404).json({isSuccess:false,message:"No matching url found for given short code"})
        }
        const targetUrl = matchingData.targetURL
        res.redirect(targetUrl)
    }
    catch(error){
        console.log(error)
        res.status(500).json({isSuccess:false,message:"Internal server error"})
    }
}

module.exports = {saveUrlToDB,redirectToTargetUrl}