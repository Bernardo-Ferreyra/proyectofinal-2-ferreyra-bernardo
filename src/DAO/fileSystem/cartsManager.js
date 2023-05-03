const fs = require("fs");

class CartManager {
  constructor(filePath) {
    this.carts = [];
    this.path = filePath;
    this.lastId = 1
    try {
      if (fs.existsSync(this.path)) {
      const jsonFile = fs.readFileSync(this.path, 'utf-8');
      const data = JSON.parse(jsonFile)
      this.carts = data
      } else {
      fs.writeFileSync(this.path, JSON.stringify(this.carts),'utf-8')
      }    
    } catch (err) {
      console.log(err) 
    } 
  };


  createCart = async (obj) => {
    try {
      if (this.carts.length > 0) {
        this.lastId = this.carts[this.carts.length - 1].id + 1;
      }
      const newCart = { id: this.lastId, ...obj }
      this.carts.push(newCart);
      await fs.promises.writeFile(this.path,JSON.stringify(this.carts, "utf-8", "\t"));
      console.log("carrito agregado.");
      return newCart
    } catch (err) {
      console.log(err);
    }
  };


  getCarts = async () => {
    try {
      return this.carts;
    } catch (err) {
      console.log(err);
    }
  };


  getCartById = async(id)=>{
    try{
      const existingId = this.carts.find(product => product.id === id);
      return existingId? existingId : console.log(`El carrito con ID ${id} no existe.`);
    }catch(err){
      console.log(err)
    }
  }

  addToCart = async (cid, pid) => {
    try {
      const carts = await this.getCarts()
      const cart = carts.find(element => element.id === cid)
      if(cart){
        const addProduct = cart.productos.find(element => element.idProduct === pid)
        if(addProduct) {
          addProduct.cantidad++
        }else{
          cart.productos.push({idProduct: pid, cantidad: 1 })
        }
        await fs.promises.writeFile(this.path, JSON.stringify(carts, "utf-8", "\t"));
        return cart
      }
      return console.log(`El carrito con ID ${cid} no existe`)
    } catch (error) {
      console.log(error);
    }
  }

}



module.exports= CartManager