const {Router} = require('express')
const {auth} = require('../middlewares/autenticacion.middleware.js')
const { userModel } = require('../DAO/models/user.model.js')
const router= Router()

router.post('/login', async(req, res)=>{
    const {email, password} = req.body
    const userDB = await userModel.findOne({email, password})

    if(!userDB) return res.send({status: 'error', message: 'no existe'})

    req.session.user ={
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: 'admin'
    }


    res.send({message: 'login  es success'})
})

router.post('/register',async(req,res)=>{
    const{username, first_name, last_name, email, password} = req.body
    const existUser= await userModel.findOne({email})
    if(existUser) return res.send({status: 'error', message:'el email ya existe'})

    const newUser={
        username,
        first_name,
        last_name,
        email,
        password
    }

    let resultUser= await userModel.create(newUser)


    res.status(200).send('registro exitoso')
})

router.get('/logout',(req,res)=>{
    req.session.destroy(err=>{
        if(err){
            res.send({status: 'error', error: err})
        }
        res.send('logout ok')
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