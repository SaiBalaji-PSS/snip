const db = require("../DB/db")
const {urlTable} = require("../Model/schema")
const {eq} = require("drizzle-orm")
const insertUrlData = async (urlData)=>{
    
    const [insertedUrlData] = await db.insert(urlTable).values(urlData).returning()
    return insertedUrlData
}

const getMatchingTargetUrlForShortCode = async (shortCode) => {
    const [matchingData] = await db.select().from(urlTable).where(eq(urlTable.shortCode,shortCode))
    return matchingData
}

module.exports = {insertUrlData,getMatchingTargetUrlForShortCode}