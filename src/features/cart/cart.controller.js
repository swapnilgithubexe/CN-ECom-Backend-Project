import CartItemModel from "./cart.model.js";

export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    //took userID from token for security reasons(attackers can't hinder the token which is generated)
    const userID = req.userID;
    CartItemModel.add(productID, userID, quantity)
    res.status(201).send("Cart is updated!")


  }
}