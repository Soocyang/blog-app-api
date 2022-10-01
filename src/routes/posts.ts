import { Router } from 'express'


import { getPosts } from '../controllers/posts'

const router = Router()

router.get('/', getPosts);
// router.get('/', getTodos);
// router.patch('/:id', updateTodo);
// router.delete('/:id', deleteTodo);

export default router