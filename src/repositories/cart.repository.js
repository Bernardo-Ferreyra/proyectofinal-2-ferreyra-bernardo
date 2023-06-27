class CartRepository{
    constructor(dao){
        this.dao = dao
    }

    getCarts(){
        return this.dao.getCarts()
    }
    getCartById(cid){
        return this.dao.getCartById(cid)
    }
    createCart(newCart){
        return this.dao.createCart(newCart)
    }
    addToCart(cid, pid, cantidad){
        return this.dao.addToCart(cid, pid, cantidad)
    }
    emptyCart(cid){
        return this.dao.emptyCart(cid)
    }
    deleteProductFromCart(cid, pid){
        return this.dao.deleteProductFromCart(cid, pid)
    }
    updateProduct(pid, obj){
        return this.dao.updateProduct(pid, obj)
    }
}

module.exports = CartRepository
