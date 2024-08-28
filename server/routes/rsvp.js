const router = require("express").Router()
const pool = require("../db")

router.post('/', async (req, res) => {
    const { weddingId, guestName, email, response, numpeople, relationship } = req.body;

    try {
        await db.query(
            'INSERT INTO rsvps (wedding_id, guest_name, email, response, numpeople, relationship) VALUES ($1, $2, $3, $4, $5, $6)',
            [weddingId, guestName, email, response,numpeople, relationship]
        );
        res.status(201).json({ message: 'RSVP submitted successfully' });
    } catch (error) {
        console.error('Error submitting RSVP', error);
        res.status(500).json({ message: 'Server error' });
    }
});
