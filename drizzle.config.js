const {defineConfig} = require("drizzle-kit")
const config = defineConfig({
  out: './drizzle',
  schema: "./Model/schema.js",
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DBURL,
  }})
  module.exports = config