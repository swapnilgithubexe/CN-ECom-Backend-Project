import CartItemModel from "./cart.model.js";

export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    //took userID from token for security reasons(attackers can't hinder the token which is generated)
    const userID = req.userID;
    console.log(req.userID);

    CartItemModel.add(productID, userID, quantity)

    res.status(201).send("Cart is updated!")
  }

  get(req, res) {
    const userID = req.userID;
    console.log(req.userID);

    const items = CartItemModel.get(userID);
    console.log(items);

    return res.status(200).send(items);
  }
}