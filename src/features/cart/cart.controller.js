import { ObjectId } from "mongodb";
import CartItemModel from "./cart.model.js";
import cartRepository from "./cart.repository.js";

export class CartItemsController {

  constructor() {
    this.cartRepository = new cartRepository()
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      //took userID from token for security reasons(attackers can't hinder the token which is generated)
      const userID = req.userID;

      await this.cartRepository.add(productID, userID, quantity);

      res.status(201).send("Cart is updated!")
    } catch (error) {
      res.status(400).send(error.message)
    }
  }

  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartRepository.get(userID);

      return res.status(200).send(items);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async delete(req, res) {
    const cartItemID = req.params.id;
    const result = await this.cartRepository.delete(cartItemID)
    if (!result) {
      return res.status(400).send(result)
    } else {
      return res.status(200).send(result)
    }
  }
}