const express = require('express');
const productsRouter= require('./src/routes/products.route')
const cartRouter = require('./src/routes/carts.route.js')
const PORT = 8080;

const app = express();

app.listen(PORT, () => {
	console.log(`Escuchando en el puerto ${PORT}`);
});

app.use(express.json())
app.use(express.urlencoded({ extended: true }));



app.use('/api/products', productsRouter)

app.use('/api/carts', cartRouter)





