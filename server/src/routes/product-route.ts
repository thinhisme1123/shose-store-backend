import express from 'express';
import { createNewProductController, deleteProductController, getAllProductController, getProductByIdController, productCollectionController, productSearchController, productSlugController, updateProductController, uploadImageController } from '../interfaces/http/controllers/product.controller';
import { uploadProductImgaes } from '../config/multer';

const router = express.Router();

router.get("/get-all-products", getAllProductController);
router.get("/get-products-by-slug/:slug", productSlugController);
router.get("/get-products-by-collection/:collection", productCollectionController);
router.get("/get-product-by-id/:id", getProductByIdController);
router.put("/update/:id", updateProductController);
router.get("/search", productSearchController);
router.post("/create-product", createNewProductController);
router.delete("/delete/:id", deleteProductController);
router.delete("/delete/:id", deleteProductController);
router.post("/upload-images", uploadProductImgaes.array('images', 10), uploadImageController);

export default router;