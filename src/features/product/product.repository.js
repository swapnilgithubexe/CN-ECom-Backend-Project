import { getDB } from "../../config/mongodb.js";

class ProductRepository {
  async add(newProduct) {
    try {
      const db = getDB();

      const collection = db.collection("products");

      return await collection.insertOne({ newProduct });
    } catch (error) {

    }
  }

  async getAll() {

  }

  async get() {

  }
}