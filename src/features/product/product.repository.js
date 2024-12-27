import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";

class ProductRepository {
  constructor() {
    this.collection = "products";
  }
  async add(newProduct) {
    try {
      const db = getDB();

      const collection = db.collection(this.collection);

      return await collection.insertOne({ newProduct });
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async getAll() {

  }

  async get() {

  }
}