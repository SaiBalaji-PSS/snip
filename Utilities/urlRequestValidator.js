const {z} = require("zod")


const validateUrlRequestBody = z.object({
    targetUrl: z.url(),
    shortCode: z.string().max(4).optional(),

})

module.exports = {validateUrlRequestBody}