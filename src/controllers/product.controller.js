const { ProductDto } = require("../dto/product.dto");
const { productService } = require("../services/Services");

class ProductController{

    getProducts = async (req, res) =>{
        try {
            const {limit= 5}= req.query
            const{page=1} = req.query
            const { sort } = req.query;
            
            const products = await productService.getProducts(limit, page, sort)
            res.status(201).send({status: 'success', payload: products})
        } catch (err) {
            console.log(err)
        }
    }

    getProductById = async(req, res) => {
        try{
            const id = req.params.pid;
            const product = await productService.getProductById(id);
            !product
            ?res.status(404).send({ error: 'No existe el producto' })
            :res.send(product); 
        } catch(err){
            console.log(err)
        }
    }

    createProduct = async(req, res)=>{
        try{
            const {title, description, price, code, stock, category, thumbnail} = req.body
            let newProduct = new ProductDto({title, description, price, code, stock, category, thumbnail}) 
            let product = await productService.createProduct(newProduct)
            !product
            ? res.status(400).send({ error: "No se pudo crear el producto" })
            : res.status(201).send({status:'producto creado', payload: product})
        } catch(err){
            console.log(err)
        }
    }

    //dto?
    updateProduct = async(req, res)=>{
        try{
            const id = req.params.pid;
            const productModify= req.body
            const modifiedProduct= await productService.updateProduct(id, productModify)
            !modifiedProduct
            ? res.status(400).send({ error: 'No se ha podido modificar!' })
            : res.status(200).send({ status: `el producto con ID ${id} se ha modificado con exito!`, payload: productModify })
        }catch(err){
            console.log(err)
        }
    }

    deleteProduct = async(req, res)=>{
        try{
            const id = req.params.pid;
            const deletedProduct = await productService.deleteProduct(id)
            !deletedProduct
            ? res.status(404).send({error: `El producto con ID ${id} no existe`})
            : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new ProductController()