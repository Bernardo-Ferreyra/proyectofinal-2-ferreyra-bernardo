const {Router} = require('express')
const passport = require('passport')
const { passportCall } = require('../config/passportCall.js')
const { authorization } = require('../config/authorizationjwtRole.js')
const sessionController = require('../controllers/session.controller.js')
const router= Router()

router.post('/login', sessionController.login )

router.post('/register', sessionController.register)

router.get('/logout', sessionController.logout)

router.get('/current', passportCall('current', {session: false}), authorization('user') ,(req,res)=>{
    res.send(req.user)
})


router.get('/github', passport.authenticate('github', {scope:['user:email']}))
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/api/session/login'}), async(req,res)=>{
    req.session.user = req.user 
    res.redirect('/')
})



module.exports= router