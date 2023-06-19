const {Router} = require('express')
const viewsController = require('../controllers/views.controller.js');
const router = Router()


router.get('/', viewsController.getProducts)

router.get('/realTimeProducts', viewsController.getRealTimeProducts)

router.get('/carts/:cid', viewsController.getCartById)


router.get('/chat', (req, res)=>{
    res.render('chat', {})
})

router.get('/api/session/login', (req,res)=>{
    res.render('login',{})
})

router.get('/api/session/register', (req,res)=>{
    res.render('registerForm',{})
})



module.exports = router