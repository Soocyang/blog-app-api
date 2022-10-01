import { Router } from 'express'


import { getPosts, createPost } from '../controllers/posts'

const router = Router()

router.get('/', getPosts);
router.post('/', createPost);
// router.patch('/:id', updateTodo);
// router.delete('/:id', deleteTodo);

export default router