const fs = require("fs");

class ProductManager {
  constructor(filePath) {
    this.products = [];
    this.path = filePath;
    this.lastId = 1
    try {
      if (fs.existsSync(this.path)) {
      const jsonFile = fs.readFileSync(this.path, 'utf-8');
      const data = JSON.parse(jsonFile)
      this.products = data
      } else {
      fs.writeFileSync(this.path, JSON.stringify(this.products),'utf-8')
      }
      
    } catch (err) {
      console.log(err) 
    }
      
  }
  
  readProducts = async () => {
    const respuesta = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    try {
      return (this.products);
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async (title ,description ,price ,thumbnail ,code ,stock) => {
    try {
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      const existingCode = this.products.find((product) => product.code === code);

      if (!title || !description || !code || !thumbnail || !price || !stock) {
        console.log("Todos los campos son obligatorios!");
      } else if (existingCode) {
        console.log("Ya existe un producto con ese codigo");
      } else {
        if (this.products.length > 0) {
          this.lastId = this.products[this.products.length - 1].id + 1;
        }
        this.products.push({ id: this.lastId, ...newProduct });
        await fs.promises.writeFile(this.path,JSON.stringify(this.products, "utf-8", "\t"));
        console.log("Producto agregado.");
      }

    } catch (err) {
      console.log(err);
    }
  };


  getProductById = async (id) => {
    try{
      let existingId = this.products.find((product) => product.id === id);
      return existingId? existingId : console.log(`El producto con ID ${id} no existe.`);
    } catch (err){
      console.log(err)
    }
  };

  deleteProduct = async (id) => {
    try{
      const productIndex = this.products.findIndex((product) => product.id === id);
      const productsFilter = this.products.filter((product) => product.id !== id);
      
      if (productIndex === -1) {
        return console.log(`El producto con ID ${id} no existe.`);
      } else {
        await fs.promises.writeFile(this.path,JSON.stringify(productsFilter, "utf-8", "\t"));
        console.log(`El producto con ID ${id} ha sido eliminado correctamente.`);
      }
      
    } catch (err){
      console.log(err)
    }
  };

  updateProduct = async ({ id, ...obj }) => {
    try {
      const productIndex = this.products.findIndex((product) => product.id === id);
  
      if (productIndex === -1) {
        return console.log(`El producto con ID ${id} no existe.`);
      } else {
        await this.deleteProduct(id);
        let oldProduct = await this.readProducts();
        let productModify = [...oldProduct, { id, ...obj }];
        await fs.promises.writeFile(this.path, JSON.stringify(productModify, "utf-8", "\t"));
        console.log(`El producto con ID ${id} ha sido modificado y agregado`);
      }
    } catch (err) {
      console.log(err);
    }
  };

}

module.exports= ProductManager