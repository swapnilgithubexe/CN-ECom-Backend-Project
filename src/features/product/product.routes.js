import express from 'express';
import ProductController from './product.controller';
const productController = new ProductController();

const router = express.Router();

router.get("/", productController.getAllProducts);
router.post("/", productController.addProduct);

export default router;