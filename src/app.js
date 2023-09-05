const express = require('express')
const handlebars = require('express-handlebars')
const { Server }= require('socket.io')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const passport = require('passport')
const routerServer= require('./routes/index.js')
const { initPassportGithub } = require('./config/passportConfig.js')
const { initPassport } = require('./config/passport-jwt-config.js')
const { productService, chatService } = require('./services/Services.js')
const configServer = require('./config/configServer.js')
const { errorHandler } = require('./middlewares/error.middleware.js')
const { addLogger, logger } = require('./utils/logger.js')
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUiExpress = require('swagger-ui-express')
const PORT = process.env.PORT
const app = express()


const httpServer = app.listen(PORT, () => {
	logger.info(`Escuchando en el puerto ${PORT}`);
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/static', express.static(__dirname+'/public'))
app.use(cookieParser(configServer.jwt_secret_key))


//hbs
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/views')
app.set('view engine', 'handlebars')

//session
app.use(session({
	store: MongoStore.create({
		ttl: 100000*60,
		mongoUrl: process.env.MONGO_URL,
		mongoOptions: {
			useNewUrlParser: true,
			useUnifiedTopology: true
		}

	}),
	secret: configServer.jwt_secret_key,
	resave: false,
	saveUninitialized: false
}))

//Passport
initPassport()
initPassportGithub()
passport.use(passport.initialize())
passport.use(passport.session())

//logger
app.use(addLogger)
app.use(errorHandler)

//routers
app.use(routerServer)

const socketServer = new Server(httpServer)
//realtimeproducts
socketServer.on('connection', socket=>{
	logger.info("cliente conectado")
	
	socket.on('deleteProduct', async ()=>{
		try{
			const data = await productService.getRealTimeProducts()
			return socket.emit('newList', data)
		}catch(error){
			logger.error(error)
		}
	})

	socket.on('addProduct', async (data) => {
		try {
			const newData = await productService.getRealTimeProducts()
			return socket.emit('productAdded', newData)
		} catch (error) {
			logger.error(error)
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
			logger.error(error)
		}
    })

    socket.on('authenticated', data => {
        socket.broadcast.emit('newUserConnected', data)
    })

})


//docs
const swaggerOptions = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Documentación de modulos Carts y Products',
            description: 'Esta es la documentación del crud de los modulos anteriormente mencionados'
        }
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
}
const specs = swaggerJsDoc(swaggerOptions)
app.use('/docs', swaggerUiExpress.serve, swaggerUiExpress.setup(specs))