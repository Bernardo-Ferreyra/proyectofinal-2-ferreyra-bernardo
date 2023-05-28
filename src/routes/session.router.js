const {Router} = require('express')
const {auth} = require('../middlewares/autenticacion.middleware.js')
const { userModel } = require('../DAO/models/user.model.js')
const { createHash, isValidPassword } = require('../utils/bcryptHash.js')
const passport = require('passport')
const { generateToken } = require('../utils/jwt.js')
const { passportCall } = require('../config/passportCall.js')
const { authorization } = require('../config/authorizationjwtRole.js')
const router= Router()

router.post('/login', async(req, res)=>{
    let {email, password} = req.body
    email = email.trim();
    password = password.trim();
    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'El email y la contraseña son obligatorios' });
    }

    const userDB = await userModel.findOne({email})
    if(!userDB) return res.status(404).send({status: 'error', message: 'usuario incorrecto'})

    if(!isValidPassword(password, userDB)) return res.status(401).send({status:'error', message:'contraseña incorrecta'})

    req.session.user ={
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        date_of_birth: userDB.date_of_birth,
        username: userDB.username,
        role: 'user'
    }

    const accessToken = generateToken({
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        date_of_birth: userDB.date_of_birth,
        username: userDB.username,
        role: 'user'
    })

    res
    .cookie('coderCookieToken', accessToken, {
        maxAge: 60*60*100,
        httpOnly: true
    }).redirect('/')
})

router.post('/register',async(req,res)=>{ 
    const{username, first_name, last_name, email, date_of_birth, password} = req.body
    const existUser= await userModel.findOne({email})
    if(existUser) return res.send({status: 'error', message:'el email ya existe'})

    const newUser={
        username,
        first_name,
        last_name,
        email,
        date_of_birth,
        username,
        password : createHash(password)
    }

    await userModel.create(newUser)
    const accessToken = generateToken({
        first_name: newUser.first_name,
        last_name: newUser.last_name,
        email: newUser.email,
        date_of_birth: newUser.date_of_birth,
        username: newUser.username,
        role: 'user'
    })

    res
    .cookie('coderCookieToken', accessToken, {
        maxAge: 60*60*100,
        httpOnly: true
    }).send({
        status:'success',
        message: 'register success',
    })
    
})


router.get('/github', passport.authenticate('github', {scope:['user:email']}))
router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/api/session/login'}), async(req,res)=>{
    req.session.user = req.user 
    res.redirect('/')
})



router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.send({status: 'error', error: err})
        }
        res.redirect('login')
    })
})

router.get('/privada', auth,(req,res)=>{
    res.send('solo admin')
})
router.get('/current', passportCall('jwt', {session: false}), authorization('user') ,(req,res)=>{
    res.send(req.user)
})


module.exports= router