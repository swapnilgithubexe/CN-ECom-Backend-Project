import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  };

  async placeOrder(userId) {

  }

  async getTotalAmount(userId) {
    const db = getDB();
    await db.collection("cartItems").aggregate([
      {
        $match: { userId: new ObjectId(userId) }
      },
      {
        $lookup: {
          from: "products",
          localField: "productID",
          foreignField: "_id",
          as: "productInfo"
        }
      },
      {
        $unwind: "$productInfo"
      },
      {
        $addField: {
          "totalAmount": {
            $multiply: ["$productInfo.price", "$quantity"]
          }
        }
      }
    ])
  }
}