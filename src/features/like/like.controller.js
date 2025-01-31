import { LikeRepository } from "./like.repository.js";

export class LikeController {
  constructor() {
    this.likeRepository = new LikeRepository();
  }
  async likeItem(req, res, next) {
    try {
      const { id, type } = req.body;
      const userId = req.userID;

      if (type != "Product" && type != "Category") {
        return res.status(400).send("Invalid Type");
      }
      if (type == "Product") {
        this.likeRepository.likeProduct(userId, id);

      }
      else if (type == "Category") {
        this.likeRepository.likeCategory(userId, id);
      }
      res.status(200).send("Like has been added!")
    } catch (error) {
      console.log("Error in the likeItem function", error);
      res.status(500).send(error);

    }
  }
}