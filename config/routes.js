const router = require('express').Router();
const adoptController = require('../controllers/animals.controller');
const authController = require('../controllers/auth.controller')
const usersController = require('../controllers/users.controller')
const animalsController = require('../controllers/animals.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const upload=require('./storage.config')

// router.get('/', (req, res, next) => {
//     res.json({ message: "Hello" });
// });
//END POINTS
//Animals------------
router.get('/adopt', adoptController.listAdoptions)
router.get('/adopt/:id', adoptController.animalDetail)
//CAMBIAR A AUTHENTICATED CUANDO CONSIGA QUE FUNCIONE EL LOGIN
router.post('/new-animal', authMiddleware.isNotAuthenticated, animalsController.createAnimal)
//Authetication--------
// router.get('/new-allert', authMiddleware.isAuthenticated, allertsController.newAllert)
//Si le das a login y no estas autenticado, inicias sesion
router.post('login', authMiddleware.isNotAuthenticated, authController.login)
//Users----------
router.get('users/me', authMiddleware.isAuthenticated, usersController.getCurrentUser)
router.post('/users',authMiddleware.isNotAuthenticated, upload.single("image"), usersController.createUser)

module.exports = router;