import express from 'express';
import ProductController from './product.controller.js';
import { uploadFile } from "../../middleware/fileupload.middleware.js";

const productController = new ProductController();

const router = express.Router();

// Define the routes under '/products'
router.get("/", productController.getAllProducts); // This will now be '/products'
router.post("/", uploadFile.single("imageUrl"), productController.addProduct); // '/products'

router.get("/filter", productController.filteredProducts.bind(productController)); // '/products/filter'

router.get("/:id", productController.getOneProduct); // '/products/:id'

export default router;
