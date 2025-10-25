const express = require("express")
const app = express()
const userRouter = require("./Routes/userRouter")
const urlRouter = require("./Routes/urlRouter")

app.use(express.json())
app.use("/snip",userRouter)
app.use(urlRouter)
app.listen(process.env.PORT,() => console.log(`Server is running on port ${process.env.PORT}`))