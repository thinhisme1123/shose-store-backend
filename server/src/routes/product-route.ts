import express from 'express';
import { productSlugController } from '../interfaces/http/controllers/product-slug.controller';
import { productCollectionController } from '../interfaces/http/controllers/product-collection.controller';

const router = express.Router();

router.get("/get-products-by-slug/:slug", productSlugController);
router.get("/get-products-by-collection/:collection", productCollectionController);

export default router;