import { ApplicationError } from "../../error/applicationError.js";
import ProductModel from "./product.model.js";
import ProductRepository from "./product.repository.js";

export default class ProductController {
  constructor() {
    this.productRepository = new ProductRepository()
  }
  async getAllProducts(req, res) {
    try {
      const products = await this.productRepository.getAll();
      res.status(200).send(products);
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async addProduct(req, res) {
    try {
      const { name, description, price, category, sizes, inStock, reviews, categories } = req.body;

      const newProduct = new ProductModel({
        name, description, price: parseFloat(price),
        category, sizes, inStock: parseInt(inStock, 10),
        reviews: reviews || [],
        categories: categories
      });

      const newRecord = await this.productRepository.add(newProduct);

      res.status(201).send(newRecord);
    } catch (error) {
      console.log("Error adding product:", error);
      res.status(500).send({ error: "Failed to add product. Please try again later." });


    }
  }

  async rateProduct(req, res, next) {
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;

      await this.productRepository.rate(userID, productID, rating);

      return res.status(200).send("Rating has been added");
    } catch (error) {
      console.error(error.message);
      next(error)
      throw new ApplicationError("Something is wrong with the database", 500);

    }

  }

  async getOneProduct(req, res) {
    try {
      const id = req.params.id;
      const product = await this.productRepository.get(id);

      if (!product) {
        return res.status(404).send("Product not found!");
      } else {
        return res.status(200).send(product);
      }
    } catch (error) {
      return res.status(404).send("Something went wrong!")
    }
  }

  async filteredProducts(req, res) {
    try {
      const minPrice = Number(req.query.minPrice);
      const maxPrice = Number(req.query.maxPrice);
      const category = req.query.category;

      const result = await this.productRepository.filter(minPrice, maxPrice, category);

      res.status(200).send(result);
    } catch (error) {
      return res.status(404).send("Something went wrong!")
    }
  }
  async averagePrice(req, res, next) {
    try {
      const result = await this.productRepository.averageProductPricePerCategory();
      res.status(200).send(result);
    } catch (error) {
      return res.status(404).send("Something went wrong!")

    }
  }

}