const {Router} = require('express')
const ProductManager = require('../DAO/productManager.js')

const router = Router()
const productsManager = new ProductManager('./products.json');


router.get('/', async (req, res) => {
	try{
		const limit = req.query.limit;
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
		const id = parseInt(req.params.pid);
		const product = await productsManager.getProductById(id);
		product
        ? res.send(product)
		: res.status(404).send({ message: 'No existe el producto' });
	} catch(err){
		console.log(err)
	}
});


router.post('/' , async (req, res)=>{
    try{
        const product = req.body
        const newProduct = await productsManager.addProduct(product)
        !newProduct
        ? res.status(400).send({ error: "No se pudo agregar el producto" })
        : res.status(201).send({status:'producto agregado', payload: product})
    } catch(err){
        console.log(err)
    }
});

router.put('/:pid', async (req, res)=>{
    try{
        const id = parseInt(req.params.pid)
        const productModify= req.body
        const modifiedProduct= await productsManager.updateProduct({id, ...productModify})
        !modifiedProduct
        ? res.status(400).send({ error: 'No se ha podido modificar!' })
        : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: modifiedProduct })
    }catch(err){
        console.log(err)
    }
});


router.delete('/:pid', async(req, res)=>{
    try{
        const id = parseInt(req.params.pid)
        const deletedProduct = await productsManager.deleteProduct(id)
        !deletedProduct
        ? res.status(404).send({error: `El producto con ID ${id} no existe`})
        : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`, payload: deletedProduct})

    }catch(err){
        console.log(err)
    }
});

module.exports= router;
