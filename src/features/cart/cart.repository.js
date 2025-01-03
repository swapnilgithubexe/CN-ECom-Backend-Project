import { getDB } from "../../config/mongodb.js";

export default class cartRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      await collection.insertOne({ productID, userID, quantity })
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
}