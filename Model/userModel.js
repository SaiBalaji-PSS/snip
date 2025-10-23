const e = require("express")
const db = require("../DB/db")
const {userTable} = require("../Model/schema")
const {eq} = require("drizzle-orm")
const {generateHashForPassword} = require("../Utilities/userUtilities")

const checkIfUserWithEmailAlreadyExist = async (email) => {
    const result =  await db.select().from(userTable).where(eq(userTable.email,email))
    
    return result.length > 0
}

const getMatchingUserFromDB = async (email,password) => {
    const [matchingUser] = await db.select().from(userTable).where(eq(userTable.email,email))
    if(matchingUser != null){
        const hashedPasswordFromDB = matchingUser.password
        const salt = matchingUser.salt
        const hashedPassword = generateHashForPassword(password,salt)
        const isMatching = hashedPasswordFromDB == hashedPassword
        return {matchingUser,isMatching}
    }
    return { matchingUser: null, isMatching: false }
    
}



const insertNewUser = async (userData) => {
    const [insertedUser] = await db.insert(userTable)
                                     .values(userData)
                                     .returning({insertedId:userTable.id})
    return insertedUser.insertedId
}
module.exports = {checkIfUserWithEmailAlreadyExist,insertNewUser,getMatchingUserFromDB}