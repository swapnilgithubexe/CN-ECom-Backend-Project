import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class cartRepository {
  constructor() {
    this.collection = "cartItems";
  }

  async add(productID, userID, quantity) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      await collection.insertOne({ productID: new ObjectId(productID), userID: new ObjectId(userID), quantity })
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async get(userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      const cartItems = await collection.find({ userID: new ObjectId(userID) }).toArray();

      return cartItems;

    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async delete(cartItemID, userID) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);

      await collection.deleteOne({ _id: new ObjectId(cartItemID), userID: new ObjectId(userID) });
      return "Item has been deleted successfully!"
    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }
}