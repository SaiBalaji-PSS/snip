const {z} = require("zod")
const userRequestValidator = z.object({
    firstName: z.string(),
    lastName: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(3)
})
const loginBodyValidator = z.object({
    email: z.string().email(),
    password: z.string().min(3)
})
module.exports = {userRequestValidator,loginBodyValidator}