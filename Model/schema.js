
const {text,varchar,timestamp,uuid, pgTable} = require("drizzle-orm/pg-core")

const userTable = pgTable("user",{
    id: uuid().notNull().primaryKey().defaultRandom(),
    firstName: varchar('first_name',{length:255}).notNull(),
    lastName: varchar('last_name',{length:255}),
    email: varchar({length:255}).notNull().unique(),
    password: text().notNull(),
    salt: text().notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(() => new Date())
})


const urlTable = pgTable("urls",{
    id: uuid().primaryKey().defaultRandom(),
    targetURL: text().notNull(), //original full url
    shortCode: text().notNull().unique(), //https:://www.sb.com/xyz (xyz-shortcode)
    userId: uuid().references(() => userTable.id).notNull(), //foreign key to userid in users table
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().$onUpdate(()=> new Date())
})

// const urlTable = pgTable("urls",{
//     id: uuid().primaryKey().defaultRandom(),
//     shortCode: varchar({length:155}).notNull().unique(), //https:://www.sb.com/xyz (xyz-shortcode)
//     targetURL: text().notNull(), //original full url
//     createdAt: timestamp("created_at").notNull().defaultNow(),
//     updatedAt: timestamp("updated_at").notNull().$onUpdate(()=>new Date()),
//     userId: uuid().references(() => userTable.id).notNull() //foreign key to userid in users table
// })

module.exports = {userTable,urlTable}