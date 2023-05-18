const {Router} = require('express')
const {auth} = require('../middlewares/autenticacion.middleware.js')
const { userModel } = require('../DAO/models/user.model.js')
const router= Router()

router.post('/login', async(req, res)=>{
    let {email, password} = req.body
    email = email.trim();
    password = password.trim();
    if (!email || !password) {
        return res.status(400).send({ status: 'error', message: 'El email y la contraseña son obligatorios' });
    }

    let role = 'user';
    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      role = 'admin';
    }

    const userDB = await userModel.findOne({email, password})
    if(!userDB) return res.status(404).send({status: 'error', message: 'usuario o contraseña incorrectos'})

    req.session.user ={
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        date_of_birth: userDB.date_of_birth,
        role: role
    }

    res.redirect('/')
})

router.post('/register',async(req,res)=>{ //ACA
    const{username, first_name, last_name, email, date_of_birth, password} = req.body
    const existUser= await userModel.findOne({email})
    if(existUser) return res.send({status: 'error', message:'el email ya existe'})

    const newUser={
        username,
        first_name,
        last_name,
        email,
        date_of_birth,
        password
    }

    await userModel.create(newUser)

    res.status(200).send('registro exitoso')
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

router.get('/counter', (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter =1
        res.send('bienvenido')
    }
})


module.exports= router