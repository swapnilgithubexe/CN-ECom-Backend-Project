import express from 'express';
import ProductController from './product.controller.js';
import { uploadFile } from "../../middleware/fileupload.middleware.js";

const productController = new ProductController();

const router = express.Router();

// Define the routes under '/products'
router.get("/", productController.getAllProducts); // This will now be '/products'
router.post("/", uploadFile.single("imageUrl"), (req, res) => {
  productController.addProduct(req, res);
}); // '/products'

router.get("/filter", productController.filteredProducts.bind(productController)); // '/products/filter'

router.get("/:id", productController.getOneProduct); // '/products/:id'

router.post("/rate", productController.rateProduct)

export default router;
