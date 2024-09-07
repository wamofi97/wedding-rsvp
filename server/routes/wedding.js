const router = require("express").Router()
const pool = require("../db")
const authorization = require("../middleware/authorization")

//create wedding
router.post("/", authorization, async(req,res) =>{
    const { 
        weddingTitle,
        fatherName,
        motherName,
        bride,
        groom,
        location,
        googlemapcode,
        date,
        time
    } = req.body;
    try {

        const result = await pool.query(
        `INSERT INTO weddings (user_id, wedding_title, father_name, mother_name, bride_name, groom_name, location, googlemapcode, date, time)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
        [
            req.user,               
            weddingTitle,           
            fatherName,             
            motherName,             
            bride,                  
            groom,                  
            location,               
            googlemapcode,          
            date,                   
            time                    
        ]
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

//get wedding
router.get("/:id", async(req,res) =>{
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * from weddings where id = $1",[id]
        );
        const weddingData = result.rows[0];
        res.status(200).json( weddingData );
    } catch (error) {
        console.error('Error getting wedding', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//update wedding
router.put("/:id/edit/", authorization, async(req,res) =>{
    const id = req.params.id;
    const { wedding_title, father_name, mother_name, bride_name, groom_name, location, googlemapcode, date, time } = req.body;
    try {
        const result = await pool.query("UPDATE weddings SET wedding_title = $1, father_name = $2, mother_name = $3, bride_name = $4, groom_name = $5, location = $6, googlemapcode = $7, date = $8, time = $9, updated_at = CURRENT_TIMESTAMP WHERE id = $10 returning *", [wedding_title, father_name, mother_name, bride_name, groom_name, location, googlemapcode, date, time, id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Wedding not found or user not authorized' });
        }

        const weddingData = result.rows[0];
        
        res.status(200).json( weddingData );
    } catch (error) {
        console.error('Error updating wedding', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

router.post("/programs", authorization, async (req, res) => {
    const { activities } = req.body;  // Make sure activities is an object
    console.log('Received activities:', activities);

    try {
        // Insert the activities directly as a JSON object into the JSONB column
        const result = await pool.query(
            "INSERT INTO programs (user_id, programs) VALUES ($1, $2) RETURNING *",
            [req.user, JSON.stringify(activities)]  // Pass the object directly, not stringified
        );

        const programData = result.rows[0].programs;
        res.status(201).json({ programData });
    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


module.exports = router