const express = require("express")
const app = express()
const cors = require("cors")

const port = process.env.PORT || 8080
require('dotenv').config();

//middleware
app.use(express.json())
app.use(cors())

//ROUTES

// register and login routes
app.use('/auth' , require('./routes/jwtAuth'))

// dashboard route
app.use("/dashboard", require("./routes/dashboard"))

// createWedding, get wedding, update wedding route
app.use("/wedding", require("./routes/wedding"))

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
})
