const express = require('express');
const routerServer= require('./src/routes/index.js')
const { connectDb }= require('./src/config/configServer.js')
const handlebars = require('express-handlebars')
/* const ProductManager = require('./src/DAO/fileSystem/productManager.js') */ //fileSystem
const ProductManagerMongo= require('./src/DAO/mongo/product.mongo.js')
const {Server}= require('socket.io')
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const PORT = 8080;
const app = express();

connectDb();

const httpServer = app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

/* const productsManager = new ProductManager('./products.json'); */ //fileSystem
const productsManager = new ProductManagerMongo;
const socketServer = new Server(httpServer)

//hbs
app.engine('handlebars', handlebars.engine())
app.set('views',__dirname+'/src/views')
app.set('view engine', 'handlebars')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname+'/src/public'))

app.use(routerServer)


socketServer.on('connection', socket=>{
	console.log("cliente conectado")
	
	socket.on('deleteProduct', async (pid)=>{
		const isValidObjectId = ObjectId.isValid(pid.id);
		if (!isValidObjectId) {
		  return socket.emit('newList', {status: "error", message: `El ID del producto es inválido`})
		}
	  
		const product = await productsManager.getProductById(pid.id)
		console.log(product)
		if(product) {
		  await productsManager.deleteProduct(pid.id)
		  const data = await productsManager.getProducts()
		  return socket.emit('newList', data)
		}
		return socket.emit('newList', {status: "error", message: `El producto con ID ${pid.id} no existe`})
	})



	
	socket.on('addProduct', async (data) => {
		try {
			const newProduct = await productsManager.addProduct(data);
			console.log(newProduct);
			const newData = await productsManager.getProducts();
			return socket.emit('productAdded', newData);
		} catch (error) {
			console.error(error);
			let errorMesg = error.message;
			return socket.emit('productAdded', { status: 'error', errorMesg });
		}
    })

})


/* const newProduct = await productsManager.addProduct(data)
console.log(newProduct)
if(newProduct.status === 'error'){
	let errorMesg = newProduct.message
	socket.emit('productAdded', {status:'error', errorMesg})
}
const newData = await productsManager.getProducts()
return socket.emit('productAdded', newData) */