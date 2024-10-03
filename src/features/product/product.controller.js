import ProductModel from "./product.model.js";

export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.GetAll();
    res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    const newProduct = {
      name, price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const newRecord = ProductModel.addNewProduct(newProduct);
    res.status(201).send("New Product Added!")
  }

  rateProduct(req, res) { }

  getOneProduct(req, res) {
    const id = req.params.id;
    const product = ProductModel.getSingleProduct(id);

    if (!product) {
      return res.status(404).send("Product not found!")
    } else {
      return res.status(200).send(product);
    }
  }

  filteredProducts(req, res) {
    const { } = req.body;
  }
}