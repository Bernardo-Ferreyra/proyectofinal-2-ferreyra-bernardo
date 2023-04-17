const express = require('express');
const productsRouter= require('./src/routes/products.route')
const cartRouter = require('./src/routes/carts.route.js')
const viewsRouter = require('./src/routes/views.route.js')
const handlebars = require('express-handlebars')
const ProductManager = require('./src/DAO/productManager.js')
const {Server}= require('socket.io')
const PORT = 8080;


const app = express();

const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

const productsManager = new ProductManager('./products.json');
const socketServer = new Server(httpServer)

//hbs
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/src/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname+'/src/public'))


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartRouter)


socketServer.on('connection', socket=>{
	console.log("cliente conectado")
	
	socket.on('deleteProduct', async (pid)=>{
		const id = await productsManager.getProductById(parseInt(pid.id))
		if(id) {
			const data = await productsManager.deleteProduct(parseInt(pid.id))
			return socket.emit('newList', data)
		}
		return socket.emit('newList', {status: "error", message: `El producto con ID ${pid.id} no existe`})
	})



	
	socket.on('addProduct', async (data) => {
        const newData = await productsManager.addProduct(data)
        if(newData.status === 'error'){
            let errorMesg = newData.message
            socket.emit('productAdded', {status:'error', errorMesg})
        }
        return socket.emit('productAdded', newData)
    })

})
