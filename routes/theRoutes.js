const router = require('express').Router();
const { models: {Bookings, Members, Facility} } = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
    try {
        const mems = await Members.findAll();
        res.send(`<h1>These are mems:</h1>
        <div>
            ${mems.map((mem) => `<p>${mem.first_name}</p>`).join('')}
        </div>`)
    }
    catch(err) {
        next(err)
    }
})