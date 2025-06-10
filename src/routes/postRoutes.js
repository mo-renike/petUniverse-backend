import { Router } from "express";
import { getPosts, createPost } from "../controllers/postController";

const router = Router();

router.post('/', createPost)
router.get('/', getPosts)

export default router