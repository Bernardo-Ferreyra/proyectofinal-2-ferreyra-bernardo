const {Router} = require('express')
const passport = require('passport')
const { passportCall } = require('../middlewares/passportCall.js')
const { authorization } = require('../middlewares/authorizationjwtRole.js')
const userController = require('../controllers/user.controller.js')
const { uploader } = require('../utils/multer.js')
const router= Router()


router.get('/users', userController.getAllUsers)

router.get('/premium/:uid', userController.changeRole)

router.get('/logout', userController.logout)

router.post('/login', userController.login )

router.post('/register', userController.register)

router.post('/forgotPassword', userController.forgotpassword)

router.post('/resetPassword', userController.resetPassword)

router.post('/:uid/documents', uploader.array('uploads'), userController.uploadDocuments)

router.post('/deleteUsers', passportCall('current', {session: false}), authorization(['admin']) , userController.deleteUsers)

router.delete('/:uid/deleteUser',passportCall('current', {session: false}), authorization(['admin']), userController.deleteUser)


//github
router.get('/github', passport.authenticate('github', {scope:['user:email']}))
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/api/session/login'}), async(req,res)=>{
    req.session.user = req.user 
    res.redirect('/')
})

//current
router.get('/current', passportCall('current', {session: false}),(req,res)=>{
    res.status(200).send({status: 'success', payload: req.user})
})


module.exports= router