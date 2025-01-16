import { ObjectId } from "mongodb";
import { getClient, getDB } from "../../config/mongodb.js";
import OrderModel from "./order.model.js";
import { ApplicationError } from "../../error/applicationError.js";


export default class OrderRepository {
  constructor() {
    this.collection = "orders";
  };

  async placeOrder(userId) {
    // const client = getClient();
    // const session = client.startSession();
    try {


      // session.startTransaction();

      const db = getDB();
      const items = await this.getTotalAmount(userId);
      // console.log(items);
      const itemsTotal = items.reduce((acc, item) => {
        return acc + item.totalAmount
      }, 0);
      // console.log(itemsTotal);
      const newOrder = new OrderModel(new ObjectId(userId), itemsTotal, new Date())
      db.collection(this.collection).insertOne(newOrder);

      for (let item of items) {
        await db.collection("products").updateOne(
          { _id: item.productID },
          { $inc: { stock: -item.quantity } }
        );

      }
      await db.collection("cartItems").deleteMany({
        userID: new ObjectId(userId)
      });
      //       session.commitTransaction();
      // session.endSession();
      return;
    } catch (error) {
      // await session.abortTransaction();
      // await session.endSession();
      console.log(error);

      throw new ApplicationError("Something went Wrong with the database", 500)
    }
  }

  async getTotalAmount(userId) {
    try {
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

      return items;

    }
    catch (error) {
      console.error("Error in getTotalAmount:", error); // Log the full error

      throw new ApplicationError("Something went Wrong with the database", 500)
    }
  }
}