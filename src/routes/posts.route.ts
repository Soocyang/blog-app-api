import { Router } from 'express'

import { PostController } from '../controllers/posts.controller'

const router = Router()
const controller = new PostController()

router.get('/', controller.getPosts);
router.get('/:id', controller.getPostById);
router.post('/', controller.createPost);
router.put('/:id', controller.updatePostById);
router.delete('/:id', controller.deletePost);


export default router