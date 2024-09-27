import express from 'express';
import ProductController from './product.controller.js';
import { uploadFile } from "../../middleware/fileupload.middleware.js";

const productController = new ProductController();

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", uploadFile.single("imageUrl"), productController.addProduct);

export default router;