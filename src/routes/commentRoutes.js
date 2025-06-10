import { Router } from "express";
import { createComment } from "../controllers/commentController";

const router = Router()

router.post('/:postid', createComment)

export default router