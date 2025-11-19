import express from 'express';
import { getAllProductController, productCollectionController, productSearchController, productSlugController } from '../interfaces/http/controllers/product.controller';

const router = express.Router();

router.get("/get-all-products", getAllProductController);
router.get("/get-products-by-slug/:slug", productSlugController);
router.get("/get-products-by-collection/:collection", productCollectionController);
router.get("/search", productSearchController);

export default router;