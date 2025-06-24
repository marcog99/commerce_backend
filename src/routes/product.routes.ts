import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/product.controller';
import { authenticateJWT } from '../middleware/auth.middleware';
import { upload } from '../config/multer';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authenticateJWT, upload.single('image'), createProduct);
router.put('/:id', authenticateJWT, upload.single('image'), updateProduct);
router.delete('/:id', authenticateJWT, deleteProduct);

export default router;
