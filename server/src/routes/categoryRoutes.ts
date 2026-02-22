import express from 'express';
import { authenticate, authorize } from '../middlewares/authMiddleware';
import {
    submitCategoryRequest,
    getMyCategoryRequests,
    approveCategoryRequest
} from '../controllers/categoryController';

const router = express.Router();

// Factory users can submit and view their requests
router.post('/request', authenticate, authorize(['FACTORY']), submitCategoryRequest);
router.get('/my-requests', authenticate, authorize(['FACTORY']), getMyCategoryRequests);

// Admin can approve/reject
router.patch('/approve/:requestId', authenticate, authorize(['ADMIN']), approveCategoryRequest);

export default router;
