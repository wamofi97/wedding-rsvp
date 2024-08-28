const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.get("/", authorization, async(req,res) =>{
    try {
        // const user = await pool.query("SELECT user_id,username,has_wedding FROM users WHERE user_id = $1", [req.user])
        // res.json(user.rows[0])
        const wedding = await pool.query("SELECT u.username, u.has_wedding, w.*FROM users u LEFT JOIN weddings w ON u.user_id = w.user_id WHERE u.user_id = $1", [req.user])

        res.json(wedding.rows[0])
        // res.json(req.user)
    } catch (error) {
        console.error(error.message)
        res.status(500).json("Server error")
    }
})

module.exports = router