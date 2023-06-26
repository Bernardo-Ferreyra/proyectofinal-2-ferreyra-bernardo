const express = require('express');
const mongoose = require('mongoose')
const handlebars = require('express-handlebars')
const { Server }= require('socket.io')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const passport = require('passport');
const routerServer= require('./src/routes/index.js')
/* const { connectDb }= require('./src/config/configServer.js') */
const { initPassportGithub } = require('./src/config/passportConfig.js');
const { initPassport } = require('./src/config/passport-jwt-config.js');
const { productService, chatService } = require('./src/services/Services.js');
const ObjectId = mongoose.Types.ObjectId
const PORT = 8080;
const app = express()
/* 
connectDb(); */

const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

const socketServer = new Server(httpServer)

//hbs
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/src/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname+'/src/public'))

app.use(cookieParser('palabrasecreta'))

app.use(session({
	store: MongoStore.create({
		ttl: 100000*60,
		mongoUrl: 'mongodb+srv://berniiferreyra:Felipeyara338@cluster0.d9ot40r.mongodb.net/?retryWrites=true&w=majority',
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}

	}),
	secret: 'palabrasecreta',
	resave: false,
	saveUninitialized: false
}))

//Passport
initPassport()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())


app.use(routerServer)

//realtimeproducts
socketServer.on('connection', socket=>{
	console.log("cliente conectado")
	
	socket.on('deleteProduct', async (pid)=>{
		try{
			const isValidObjectId = ObjectId.isValid(pid.id)
			if (!isValidObjectId) {
			  return socket.emit('newList', {status: "error", message: `El ID del producto es inválido`})
			}
		  
			const product = await productService.getProductById(pid.id)
			if(product) {
			  await productService.deleteProduct(pid.id)
			  const data = await productService.getProducts()
			  return socket.emit('newList', data)
			}
			return socket.emit('newList', {status: "error", message: `El producto con ID ${pid.id} no existe`})
		}catch(err){
			console.log(err)
		}
	})

	socket.on('addProduct', async (data) => {
		try {
			await productService.addProduct(data);
			const newData = await productService.getProducts()
			return socket.emit('productAdded', newData)
		} catch (error) {
			return socket.emit('productAdded', { status: 'error', message: `El code: ${data.code} ya existe!`})
		}
    })

})
 

//chat
socketServer.on('connection', socket => {

    socket.on('message', async(data) => {
		try{
			await chatService.saveMessages(data)
			const messages = await chatService.getMessages()
			socketServer.emit('messageLogs', messages)
		}catch(error){
			console.log(error)
		}
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})


