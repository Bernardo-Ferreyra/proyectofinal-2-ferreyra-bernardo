const { productService } = require("../services/Services");

class ProductController{

    getProducts = async(req, res) => {
        try{
            const {limit= 5}= req.query
            const{page=1} = req.query
            const { sort } = req.query;
            let sortOptions={}
    
            if (sort === 'asc') {
                sortOptions = { price: 1 };
            } else if (sort === 'desc') {
                sortOptions = { price: -1 };
            }
    
            let { 
                docs, 
                totalPages,
                prevPage, 
                nextPage,
                hasPrevPage, 
                hasNextPage,
                prevLink,
                nextLink 
            } = await productService.getProductsPaginate(limit ,page ,sortOptions)
    
            !hasPrevPage
            ? prevLink = null
            : prevLink =`/api/products?page=${prevPage}&limit=${limit}&sort=${sort}`
    
            !hasNextPage 
            ?nextLink = null
            :nextLink =`/api/products?page=${nextPage}&limit=${limit}&sort=${sort}`
    
    
            res.send({
                status: 'success',
                payload: docs,
                totalPages,
                prevPage,
                nextPage,
                page,
                hasPrevPage,
                hasNextPage,
                prevLink,
                nextLink
            })
        } catch(err){
            console.log(err)
        }
    }

    getProductById = async(req, res) => {
        try{
            const id = req.params.pid;
            const product = await productService.getProductById(id);
            Object.keys(product).length === 0// si el obj esta vacio
            ?res.status(404).send({ error: 'No existe el producto' })
            :res.send(product); 
        } catch(err){
            console.log(err)
        }
    }

    addProduct = async(req, res)=>{
        try{
            const product = req.body
            const newProduct = await productService.addProduct(product)
            Object.keys(newProduct).length === 0
            ? res.status(400).send({ error: "No se pudo agregar el producto" })
            : res.status(201).send({status:'producto agregado', payload: newProduct})
        } catch(err){
            console.log(err)
        }
    }

    updateProduct = async(req, res)=>{
        try{
            const id = req.params.pid;
            const productModify= req.body
            const modifiedProduct= await productService.updateProduct(id, productModify)
            Object.keys(modifiedProduct).length === 0
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
            Object.keys(deletedProduct).length === 0
            ? res.status(404).send({error: `El producto con ID ${id} no existe`})
            : res.status(200).send({ status:`El producto con ID ${id} se ha eliminado`, payload: deletedProduct});
        }catch(err){
            console.log(err)
        }
    }
}

module.exports = new ProductController()