import { Router } from "express";
import {
    createComment,
    getAllComments,
    getCommentById,
    updateComment,
    deleteComment
} from "../controllers/commentController.js";
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.use(authenticateToken);

router.post('/:postid', createComment);
router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);

export default router;