const router = require('express').Router();
const authMiddleware = require('../middlewares/authMiddleware');

router.get('/', (req, res, next) => {
    res.json({ message: "Hello" });
});

module.exports = router;