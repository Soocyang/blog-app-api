import { Router } from 'express'

import postsRoutes from './posts.route'
import tagsRoutes from './tags.route'

const router = Router()

router.use('/posts', postsRoutes)
router.use('/tags', tagsRoutes)


export default router