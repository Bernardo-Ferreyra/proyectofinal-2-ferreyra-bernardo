const { userModel } = require("../DAO/models/user.model");
const CartManagerMongo = require("../DAO/mongo/cart.mongo");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const { generateToken } = require("../utils/jwt");
const cartsManager = new CartManagerMongo ;

class SessionController {

    login = async (req, res) =>{
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
            cart:userDB.cart,
            role: userDB.role
        }
    
        const accessToken = generateToken({
            first_name: userDB.first_name,
            last_name: userDB.last_name,
            email: userDB.email,
            date_of_birth: userDB.date_of_birth,
            username: userDB.username,
            cart: userDB.cart,
            role: userDB.role
        })
    
        res.cookie('coderCookieToken', accessToken, {
            maxAge: 60*60*100,
            httpOnly: true
        }).redirect('/')
        
    }

    register = async(req,res)=>{ 
        const{username, first_name, last_name, email, date_of_birth, password} = req.body
        const existUser= await userModel.findOne({email})
        if(existUser) return res.send({status: 'error', message:'el email ya existe'})

        const newCart = {products:[]}
        const cart= await cartsManager.createCart(newCart)

        let role = userModel.schema.path('role').default()
        if(email === 'adminCoder@coder.com'){
            role = "admin"
        }
    
        const newUser={
            username,
            first_name,
            last_name,
            email,
            date_of_birth,
            cart: cart._id,
            role: role,
            password : createHash(password)
        }
        await userModel.create(newUser)

        const accessToken = generateToken({
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
            date_of_birth: newUser.date_of_birth,
            username: newUser.username,
            cart: newUser.cart,
            role: newUser.role
        })
    
        res.cookie('coderCookieToken', accessToken, {
            maxAge: 60*60*100,
            httpOnly: true
        }).send({
            status:'success',
            message: 'register success',
        })
        
    }
    
    logout= (req,res)=>{
        req.session.destroy(err=>{
            if(err){res.send({status: 'error', error: err})}
            res.clearCookie('coderCookieToken');
            res.redirect('login')
        })
    }
}

module.exports= new SessionController()