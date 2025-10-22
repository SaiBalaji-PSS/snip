
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

module.exports = {userTable}