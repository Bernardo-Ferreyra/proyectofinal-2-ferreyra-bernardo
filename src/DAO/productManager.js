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
  };

  getProducts = async () => {
    try {
      return this.products;
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async (newProduct) => {
    try {
      const {
        title,
        description,
        price,
        code,
        stock,
        category,
      } = newProduct

      const existingCode = this.products.find((product) => product.code === code);

      if (!title || !description || !code || !price || !stock || !category ) {
        return console.log("Todos los campos son obligatorios!");
      } else if (existingCode) {
        return console.log("Ya existe un producto con ese codigo");
      } else {
        const status = true;
        if (this.products.length > 0) {
          this.lastId = this.products[this.products.length - 1].id + 1;
        }
        this.products.push({ id: this.lastId, status, ...newProduct });
        await fs.promises.writeFile(this.path,JSON.stringify(this.products, "utf-8", "\t"));
        return this.products
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
         console.log( `El producto con ID ${id} ha sido eliminado correctamente.`);
      }
      return productsFilter
    } catch (err){
      console.log(err)
    }
  };

  updateProduct = async ({ id, ...obj }) => {
    try {
      const productIndex = this.products.findIndex((product) => product.id === id);

      if (productIndex === -1) {
        return console.log(`El producto con ID ${id} no existe.`);
      } 

      let oldProducts = await this.getProducts();
      let newProducts = oldProducts.map((product) => {
        if (product.id === id) {
          return { id, ...obj };
        } else {
          return product;
        }
      });

      await fs.promises.writeFile(this.path, JSON.stringify(newProducts, "utf-8", "\t"));
      return newProducts;
      
    } catch (err) {
      console.log(err);
    }
  };
};

module.exports= ProductManager;