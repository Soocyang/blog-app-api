import { Router } from 'express'


import { getPosts, createPost, deletePost, getPostById } from '../controllers/posts'

const router = Router()

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);
// router.patch('/:id', updateTodo);

export default router