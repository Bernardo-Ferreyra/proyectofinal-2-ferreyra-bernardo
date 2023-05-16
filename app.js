const express = require('express');
const routerServer= require('./src/routes/index.js')
const { connectDb }= require('./src/config/configServer.js')
const handlebars = require('express-handlebars')
const ProductManagerMongo= require('./src/DAO/mongo/product.mongo.js')
const ChatManagerMongo = require('./src/DAO/mongo/chat.mongo.js')
const {Server}= require('socket.io')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const FileStore = require('session-file-store')
const ObjectId = mongoose.Types.ObjectId

const PORT = 8080;
const app = express()

connectDb();

const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

const productsManager = new ProductManagerMongo
const messageManager = new ChatManagerMongo
const socketServer = new Server(httpServer)

//hbs
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/src/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname+'/src/public'))

app.use(cookieParser())


/* app.use(session({
	secret: 'secretCoder',
	resave: true,
	saveUninitialized: true
})) */
const fileStore = FileStore(session)

app.use(session({
	store: new fileStore({
		ttl: 100000*60,
		path: './session',
		retries: 0
	}),
	secret: 'secretCoder',
	resave: true,
	saveUninitialized: true
}))

app.use(routerServer)


socketServer.on('connection', socket=>{
	console.log("cliente conectado")
	
	socket.on('deleteProduct', async (pid)=>{
		try{
			const isValidObjectId = ObjectId.isValid(pid.id)
			if (!isValidObjectId) {
			  return socket.emit('newList', {status: "error", message: `El ID del producto es inválido`})
			}
		  
			const product = await productsManager.getProductById(pid.id)
			if(product) {
			  await productsManager.deleteProduct(pid.id)
			  const data = await productsManager.getProducts()
			  return socket.emit('newList', data)
			}
			return socket.emit('newList', {status: "error", message: `El producto con ID ${pid.id} no existe`})
		}catch(err){
			console.log(err)
		}
	})



	
	socket.on('addProduct', async (data) => {
		try {
			await productsManager.addProduct(data);
			const newData = await productsManager.getProducts()
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
			await messageManager.saveMessages(data)
			const messages = await messageManager.getMessages()
			socketServer.emit('messageLogs', messages)
		}catch(error){
			console.log(error)
		}
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})
