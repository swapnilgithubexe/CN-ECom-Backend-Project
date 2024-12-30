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
      const collection = db.collection(this.collection);

      return await collection.find();
    } catch (error) {
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
  async get(id) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      return await collection.findOne({ _id: new ObjectId(id) });



    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      let filterExpression = {};

      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) }
      }
      if (maxPrice) {
        filterExpression.price = { $lte: parseFloat(maxPrice) }
      }
      if (category) {
        filterExpression.category = category;
      }

      return collection.find(filterExpression).toArray();
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }

  }

  async rate(userID, productID, rating) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      await collection.updateOne({ _id: new ObjectId(productID) }, {
        $push: { ratings: { userID, rating } }
      });
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
}