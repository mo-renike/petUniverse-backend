import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

export const createComment = async(req, res)=>{
    const {content, authorId}  = req.body

    const {postId} = req.params

    try {
        const comments = await prisma.comment.create({
            data:{
                content,
                postId,
                authorId,
            }
        })
        res.status(201).json(comments)
    } catch (error) {
        res.status(501).send("Could not create new comment ")
    }
}