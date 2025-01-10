import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";

export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  };

  async placeOrder(userId) {
    await this.getTotalAmount(userId);

  }

  async getTotalAmount(userId) {
    const db = getDB();
    const items = await db.collection("cartItems").aggregate([
      {
        $match: { userID: new ObjectId(userId) }
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
        $addFields: {
          "totalAmount": {
            $multiply: ["$productInfo.price", "$quantity"]
          }
        }
      }
    ]).toArray();
    const itemsTotal = items.reduce((acc, item) => {
      return acc + item.totalAmount
    }, 0);


  }
}