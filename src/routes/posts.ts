import { Router } from 'express'


import { getPosts, createPost, deletePost } from '../controllers/posts'

const router = Router()

router.get('/', getPosts);
router.post('/', createPost);
router.delete('/:id', deletePost);
// router.patch('/:id', updateTodo);

export default router