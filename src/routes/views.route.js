const {Router} = require('express')
const { authorization } = require('../middlewares/authorizationjwtRole.js');
const { passportCall } = require('../middlewares/passportCall.js');
const viewsController = require('../controllers/views.controller.js');
const router = Router()

router.get('/', viewsController.getProducts)

router.get('/carts/:cid', viewsController.getCartById)

router.get('/realTimeProducts',passportCall('current', {session: false}),authorization(['admin']), viewsController.getRealTimeProducts)

router.get('/api/session/usersControlPanel',passportCall('current', {session: false}), authorization(['admin']), viewsController.usersControlPanel)

router.get('/chat', (req, res)=>{
    res.render('chat', {user: req.session.user})
})

router.get('/api/session/login', (req,res)=>{
    res.render('login',{})
})

router.get('/api/session/register', (req,res)=>{
    res.render('registerForm',{})
})

router.get('/api/session/forgotPassword', (req,res)=>{
    res.render('forgotPassword',{})
})

router.get('/api/session/resetPassword', viewsController.resetPasswordpage)


module.exports = router