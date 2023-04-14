const userController = require('../controllers/userController')
const middlewareController = require('../controllers/middlewareController');
const mailController = require('../controllers/mailController')
const router = require('express').Router()

//user
router.post('/register',userController.registerUser)
router.post('/login', userController.loginUser);
router.get('/', middlewareController.verifyToken, userController.getAllUser);

router.post('/logout', middlewareController.verifyToken, userController.logoutUser);
//send mail 
router.get('/send-mail', mailController.sendMailRequest)
router.get('/send-mail-query', mailController.sendMailQuery)
module.exports  = router