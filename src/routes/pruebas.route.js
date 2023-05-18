/* const {Router} = require('express')
const {auth} = require('../middlewares/autenticacion.middleware.js')

const router= Router()

router.get('/', (req, res)=>{
    res.render('login',{})
})

router.post('/getcookieuser', (req,res)=>{
    const {username, email} = req.body
    res.cookie(username, email, {maxAge:1000000, signed :true }).send({message: 'seteado'})
})


router.get('/session', (req,res)=>{
    if(req.session.counter){
        req.session.counter++
        res.send(`se ha visitado el sitio ${req.session.counter} veces`)
    }else{
        req.session.counter =1
        res.send('bienvenido')
    }
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




router.post('/session', (req,res)=>{
    const {username, password} = req.body
    if(username !== 'berni' || password !== 'berni123'){
        return res.send('fallo login')
    }
    req.session.user= username
    req.session.admin= true
    console.log(req.session)

    res.send('login success')
})


module.exports = router */