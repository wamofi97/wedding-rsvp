const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

router.post("/", authorization, async(req,res) =>{
    const { weddingTitle, fatherName, motherName, brideName, groomName, location, googlemapcode, date, time } = req.body;
    try {
        const result = await pool.query("INSERT INTO weddings (user_id, wedding_title, father_name, mother_name, bride_name, groom_name, location, googlemapcode, wedding_date, wedding_time ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",[req.user, weddingTitle, fatherName, motherName, brideName, groomName, location, googlemapcode, date, time]
        );

        const weddingData = result.rows[0].id;
        if(weddingData){
            await pool.query("UPDATE users SET has_wedding = true WHERE user_id = $1", [req.user])
        }
        res.status(201).json({ weddingData });
    } catch (error) {
        console.error('Error creating wedding', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get("/:id", async(req,res) =>{
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * from weddings where user_id = $1",[id]
        );
        const weddingData = result.rows[0];
        res.status(200).json( weddingData );
    } catch (error) {
        console.error('Error getting wedding', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/:id/edit", authorization, async(req,res) =>{
    const { weddingTitle, fatherName, motherName, brideName, groomName, location, googlemapcode, date, time } = req.body;
    try {
        const results = await db.query("UPDATE weddings SET wedding_title = $1, father_name = $2, mother_name = $3, bride_name = $4, groom_name = $5, location = $6, googlemapcode = $7, wedding_date = $8, wedding_time = $9  where user_id = $10 returning *", [weddingTitle, fatherName, motherName, brideName, groomName, location, googlemapcode, date, time, req.user]);
        const weddingData = result.rows[0];
        
        res.status(200).json( weddingData );
    } catch (error) {
        console.error('Error updating wedding', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router