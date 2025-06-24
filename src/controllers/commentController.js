import { prisma } from '../utils/prisma.js'

export const createComment = async (req, res) => {
  const { content, authorId } = req.body

  const postId = req.params.postid;

  try {


    const comments = await prisma.comment.create({
      data: {
        content,
        post: {
          connect: { id: parseInt(postId) }
        },
        author: {
          connect: { id: authorId }
        }
      }
    });

    res.status(201).json(comments)
  } catch (error) {
    console.log("Failed to create coment because: ", error);

    res.status(501).send("Could not create new comment ")
  }
}