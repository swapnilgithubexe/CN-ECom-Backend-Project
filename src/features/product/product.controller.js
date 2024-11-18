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

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    try {
      ProductModel.rateProduct(userID, productID, rating)
    } catch (error) {
      return res.status(400).send(error);
    }

    return res.status(200).send("Rating has been added");

  }

  getOneProduct(req, res) {
    const id = req.params.id;
    try {
      ProductModel.getSingleProduct(id);

    } catch (error) {
      return res.status(404).send("Product not found!")
    }
    return res.status(200).send(product);

  }

  filteredProducts(req, res) {

    const minPrice = Number(req.query.minPrice);
    const maxPrice = Number(req.query.maxPrice);
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);

    res.status(200).send(result);
  }

}