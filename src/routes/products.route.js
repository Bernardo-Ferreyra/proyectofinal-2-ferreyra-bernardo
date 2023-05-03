const {Router} = require('express')
/* const ProductManager = require('../DAO/fileSystem/productManager.js') */ //fileSystem
const ProductManagerMongo= require('../DAO/mongo/product.mongo.js')

const router = Router()
/* const productsManager = new ProductManager('./products.json'); */ //fileSystem
const productsManager = new ProductManagerMongo ;


router.get('/', async (req, res) => {
	try{
		const limit = req.query.limit
		const products = await productsManager.getProducts();
		limit 
        ? res.send(products.slice(0, limit)) 
        : res.send(products);  
	} catch(err){
	    console.log(err)
	}
});


router.get('/:pid', async (req, res) => {
	try{
		const id = req.params.pid;
		const product = await productsManager.getProductById(id);
        Object.keys(product).length === 0// si el obj esta vacio
        ?res.status(404).send({ error: 'No existe el producto' })
		:res.send(product); 
	} catch(err){
		console.log(err)
	}
});


router.post('/' , async (req, res)=>{
    try{
        const product = req.body
        const newProduct = await productsManager.addProduct(product)
        Object.keys(newProduct).length === 0
        ? res.status(400).send({ error: "No se pudo agregar el producto" })
        : res.status(201).send({status:'producto agregado', payload: newProduct})
    } catch(err){
        console.log(err)
    }
});

router.put('/:pid', async (req, res)=>{
    try{
        const id = req.params.pid;
        const productModify= req.body
        const modifiedProduct= await productsManager.updateProduct(id, productModify)
        Object.keys(modifiedProduct).length === 0
        ? res.status(400).send({ error: 'No se ha podido modificar!' })
        : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: productModify })
    }catch(err){
        console.log(err)
    }
});


router.delete('/:pid', async(req, res)=>{
    try{
        const id = req.params.pid;
        const deletedProduct = await productsManager.deleteProduct(id)
        Object.keys(deletedProduct).length === 0
        ? res.status(404).send({error: `El producto con ID ${id} no existe`})
        : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`, payload: deletedProduct});
    }catch(err){
        console.log(err)
    }
});


module.exports= router;
