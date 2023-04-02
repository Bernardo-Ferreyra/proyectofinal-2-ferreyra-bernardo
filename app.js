const express = require('express');
const ProductManager = require('./productManager.js');
const PORT = 8080;

const app = express();

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

const productsManager = new ProductManager('./products.json');

app.use(express.urlencoded({ extended: true }));

app.get('/products', async (req, res) => {
	try{
		const limit = req.query.limit;
		const products = await productsManager.getProducts();
	
		limit ? res.send(products.slice(0, limit)) : res.send(products);
	} catch(err){
		console.log(err)
	}
});


app.get('/products/:pid', async (req, res) => {
	try{

		const id = parseInt(req.params.pid);
		const product = await productsManager.getProductById(id);
		product
		? res.send(product)
		: res.status(404).send({ message: 'No existe el producto' });
	} catch(err){
		console.log(err)
	}
});




