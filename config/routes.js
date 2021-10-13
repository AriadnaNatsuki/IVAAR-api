const router = require('express').Router();
const adoptController = require('../controllers/adopt.controller');
const authController = require('../controllers/auth.controller')
const usersController=require('../controllers/users.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const upload=require('./storage.config')

// router.get('/', (req, res, next) => {
//     res.json({ message: "Hello" });
// });
//END POINTS
//Animals------------
router.get('/adopt', adoptController.listAdoptions)
router.get('/adopt/:id', adoptController.animalDetail)
//Authetication--------
// router.get('/new-allert', authMiddleware.isAuthenticated, allertsController.newAllert)
router.post('login', authMiddleware.isNotAuthenticated, authController.loginlogin)
//Users----------
router.get('users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.post('/users',authMiddleware.isNotAuthenticated, upload.single("image"), usersController.createUser)

module.exports = router;