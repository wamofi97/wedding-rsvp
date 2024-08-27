const router = require("express").Router()
const pool = require("../db")
const bcrypt = require("bcrypt")
const jwtGenerator = require("../utils/jwtGenerator")
const validInfo = require("../middleware/validInfo")
const authorization = require("../middleware/authorization")

//register route
router.post('/register',validInfo, async(req,res) =>{
    try {
        // 1. destucture req.body (name, email, password)
        const {name, email, password} = req.body

        // 2. check if user exist(throw err if exist)
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (user.rows.length !== 0){
            return res.status(401).json("User with that email already exist!")
        }

        // 3. bcrypt user password
        const saltRound = 10;
        const salt = await bcrypt.genSalt(saltRound)
        const hashedPassword = await bcrypt.hash(password, salt)

        // 4. enter new user into database
        const newUser = await pool.query("INSERT INTO users (username, email, password) VALUES ($1,$2,$3) RETURNING *" , [name,email,hashedPassword])

        // 5. generate jwt
        const token = jwtGenerator(newUser.rows[0].user_id)
        res.json({token})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

// login route
router.post("/login", validInfo, async (req,res) =>{
    try {
        // 1. destructure req.body (name, email password)
        const {email,password} = req.body
        // 2. check if user exist, throw err if does not exist
        const user = await pool.query("SELECT * FROM users WHERE email = $1", [email])
        if (user.rows.length === 0){
            return res.status(401).json("User with the email does not exist")
        }
        // 3. compare password with the database password
        const isValidPwd = await bcrypt.compare(password, user.rows[0].password);
        if(!isValidPwd){
            return res.status(401).json("Password is incorrect")
        }
        // 4. give jwt token
        const token = jwtGenerator(user.rows[0].user_id)
        res.json({token})
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
    
})

router.get("/is-verify",authorization, async (req,res) => {
    try {
        res.json(true)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Server error")
    }
})

module.exports = router;