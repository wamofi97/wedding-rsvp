const express = require("express")
const app = express()
const cors = require("cors")

//middleware
app.use(express.json())
app.use(cors())

//ROUTES

// register and login routes
app.use('/auth' , require('./routes/jwtAuth'))

// dashboard route
app.use("/dashboard", require("./routes/dashboard"))

// createWedding route
app.use("/wedding", require("./routes/wedding"))

//get a wedding
app.use("/wedding", require("./routes/wedding"))

//update a wedding
app.use("/wedding", require("./routes/wedding"))

app.listen(5000, () => {
    console.log("server is running on port 5000")
})