const router = require('express').Router();
const adoptController = require('../controllers/adopt.controller');
const authMiddleware = require('../middlewares/authMiddleware');

// router.get('/', (req, res, next) => {
//     res.json({ message: "Hello" });
// });
router.get('/adopt', adoptController.listAdoptions)
// router.get('/adopt/:id', adoptController.animalDetail)

module.exports = router;