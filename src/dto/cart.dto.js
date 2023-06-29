class CartDto{
    constructor(cart){
        this.products= cart.products
/*         cart.products.map((product) => {
            return {
                product: product.product._id,
                cantidad: product.cantidad
            };
        }) */
    }
}

module.exports ={
    CartDto
}