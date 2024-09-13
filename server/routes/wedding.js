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

//create programs
router.post("/programs", authorization, async (req, res) => {
    const { program } = req.body; 
    try {
        // Insert the activities directly as a JSON object into the JSONB column
        const result = await pool.query(
            "INSERT INTO programs (user_id, programs) VALUES ($1, $2) RETURNING *",
            [req.user, JSON.stringify(program)]  // Pass the object directly, not stringified
        );

        const programData = result.rows[0].programs;
        if(programData){
            await pool.query("UPDATE programs SET wedding_id = (SELECT id FROM weddings WHERE user_id = $1) WHERE user_id = $2 ", [req.user, req.user])
        }
        res.status(201).json({ programData });
    } catch (error) {
        console.error('Error creating program:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

//get programs
router.get("/:id/programs", async(req,res) =>{
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * from programs where wedding_id = $1",[id]
        );
        const programData = result.rows[0];
        res.status(200).json( programData );
    } catch (error) {
        console.error('Error getting program', error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.put("/:id/programs/edit", authorization, async(req,res) =>{
    const id = req.params.id;
    const { program } = req.body;
    try {
        const result = await pool.query("UPDATE programs SET programs = $1, updated_at = CURRENT_TIMESTAMP WHERE wedding_id = $2 returning *", [JSON.stringify(program), id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Wedding not found or user not authorized' });
        }

        const programData = result.rows[0];
        
        res.status(200).json( programData );
    } catch (error) {
        console.error('Error updating program', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// create rsvp
router.post("/:id/rsvps", async(req,res) =>{
    try {
        const id = req.params.id;
        const { name, relationship, attendance, number } = req.body;
        const result = await pool.query(
            "INSERT INTO rsvps (wedding_id, guest_name, relationship, attendance, number) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [id, name, relationship, attendance, number]  
        );
        const rsvpData = result.rows[0];
        res.status(200).json( rsvpData );
    } catch (error) {
        console.error('Error creating rsvp', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// create wishes
router.post("/:id/wishes", async(req,res) =>{
    try {
        const id = req.params.id;
        const { name, message } = req.body;
        const result = await pool.query(
            "INSERT INTO wishes (wedding_id, name, message) VALUES ($1, $2, $3) RETURNING *",
            [id, name, message]  
        );
        const wishesData = result.rows[0];
        res.status(200).json( wishesData );
    } catch (error) {
        console.error('Error creating wishes', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// get wishes
router.get("/:id/wishes", async(req,res) =>{
    try {
        const id = req.params.id;
        const result = await pool.query("SELECT * from wishes where wedding_id = $1 ORDER BY id DESC",[id]);
        const wishesData = result.rows;
        res.status(200).json( wishesData );
    } catch (error) {
        console.error('Error getting wishes', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router