const {drizzle} = require("drizzle-orm/node-postgres")
require("dotenv").config()
const db = drizzle(process.env.DBURL)
module.exports = db 