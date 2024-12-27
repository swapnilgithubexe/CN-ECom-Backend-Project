import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";

export default class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      const db = getDB();

      const collection = db.collection(this.collection);

      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async getAll() {
    try {
      const db = getDB();
      const collection = this.collection;

      return await collection.find();
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection("products");
      console.log(collection);


      if (!ObjectId.isValid(id)) {
        throw new ApplicationError("Invalid product ID format", 400);
      }

      const product = await collection.findOne({ _id: new ObjectId(id) });

      if (!product) {
        throw new ApplicationError("Product not found", 404);

        return product;
      }
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
}