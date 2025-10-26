const db = require("../DB/db")
const {urlTable} = require("../Model/schema")
const {eq,and} = require("drizzle-orm")


const checkIfGivenUrlAlreadyExist = async (targetUrl) => {
    const matchingData = await db.select().from(urlTable).where(eq(urlTable.targetURL,targetUrl))
    console.log(matchingData.length > 0) 
    return matchingData.length > 0
}
const insertUrlData = async (urlData)=>{
    
    const [insertedUrlData] = await db.insert(urlTable).values(urlData).returning()
    return insertedUrlData
}

const getMatchingTargetUrlForShortCode = async (shortCode) => {
    const [matchingData] = await db.select().from(urlTable).where(eq(urlTable.shortCode,shortCode))
    return matchingData
}


const getAllShortCodesForGivenUserId = async (userId) => {
    const shortCodes = await db.select().from(urlTable).where(eq(urlTable.userId,userId))
    return shortCodes
}

const deleteUrlDataForGivenUserId = async (userId,shortCode) => {
    await db.delete(urlTable).where(and(eq(urlTable.shortCode,shortCode),eq(urlTable.userId,userId)))
}

module.exports = {insertUrlData,getMatchingTargetUrlForShortCode,checkIfGivenUrlAlreadyExist,getAllShortCodesForGivenUserId,deleteUrlDataForGivenUserId}