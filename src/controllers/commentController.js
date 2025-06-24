import { prisma } from '../utils/prisma.js'

export const createComment = async (req, res) => {
  const { content } = req.body;
  const postId = req.params.postid;
  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        post: { connect: { id: parseInt(postId) } },
        author: { connect: { id: req.user.id } },
      },
    });
    res.status(201).json(comment);
  } catch (error) {
    console.log('Failed to create comment because: ', error);
    res.status(501).send('Could not create new comment');
  }
};

// Get all comments (admin: all, user: own)
export const getAllComments = async (req, res) => {
  try {
    let comments;
    if (req.user.role === 'ADMIN') {
      comments = await prisma.comment.findMany();
    } else {
      comments = await prisma.comment.findMany({ where: { authorId: req.user.id } });
    }
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
};

// Get comment by ID (admin: any, user: own)
export const getCommentById = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (req.user.role !== 'ADMIN' && comment.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    res.json(comment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comment' });
  }
};

// Update comment (admin: any, user: own)
export const updateComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (req.user.role !== 'ADMIN' && comment.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const updated = await prisma.comment.update({
      where: { id: parseInt(req.params.id) },
      data: req.body,
    });
    res.json({ message: 'Comment updated', comment: updated });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update comment' });
  }
};

// Delete comment (admin: any, user: own)
export const deleteComment = async (req, res) => {
  try {
    const comment = await prisma.comment.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!comment) return res.status(404).json({ error: 'Comment not found' });
    if (req.user.role !== 'ADMIN' && comment.authorId !== req.user.id) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    await prisma.comment.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete comment' });
  }
};