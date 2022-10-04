import { Router } from 'express'


import { getPosts, createPost, deletePost, getPostById, updatePostById } from '../controllers/posts'

const router = Router()

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePostById);

export default router