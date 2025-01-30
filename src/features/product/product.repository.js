import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js";
import { ApplicationError } from "../../error/applicationError.js";
import mongoose from "mongoose";
import productSchema from "./product.schema.js";
import reviewSchema from "./review.schema.js";

const ProductModel = mongoose.model("Product", productSchema);
const ReviewModel = mongoose.model("Reviews", reviewSchema);

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
      console.log("Call from controller to repo");

      const products = await ProductModel.find();

      return products;
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

  // async rate(userID, productID, rating) {
  //   try {
  //     const db = getDB();
  //     const collection = db.collection(this.collection);

  //     const productObjectID = new ObjectId(productID);
  //     const userObjectID = new ObjectId(userID);
  //     //Finding the product
  //     const product = await collection.findOne({ _id: productObjectID });

  //     //Finding if the same user has any rating beforehand
  //     const userRating = product?.ratings?.find(r => r.userID.equals(userObjectID));
  //     // ?. is null check to eradicate the undefined typeError
  //     //similary we could write if(product && product.ratings)
  //     if (userRating) {
  //       await collection.updateOne({ _id: productObjectID, "ratings.userID": userObjectID }, {
  //         $set: { "ratings.$.rating": rating }
  //       })
  //     } else {
  //       await collection.updateOne({ _id: productObjectID }, {
  //         $push: { ratings: { userID: userObjectID, rating } }
  //       });
  //     }
  //   } catch (error) {
  //     console.error(error.message);
  //     throw new ApplicationError("Something is wrong with the database", 500);
  //   }
  // }

  //Second approach and more optimized
  async rate(userID, productID, rating) {
    try {
      const product = await ProductModel.findById(productID);
      if (!product) {
        throw new Error("Product not found")
      }

      const userReview = await ReviewModel.findOne({ product: new ObjectId(productID), user: new ObjectId(userID) });
      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating
        })
        await newReview.save();
      }


    } catch (error) {
      console.error(error.message);
      throw new ApplicationError("Something is wrong with the database", 500);
    }
  }

  async averageProductPricePerCategory() {
    try {
      const db = getDB()
      return await db.collection(this.collection).aggregate([
        //stage1 
        {
          $group: {
            _id: "$category",
            averagePrice: {
              $avg: "$price"
            }
          }
        }
      ]).toArray();
    } catch (error) {

    }
  }

}