import { Router } from 'express'

import postsRoutes from './posts.route'
import tagsRoutes from './tags.route'
import testRoutes from './tests.route'

const router = Router()

router.use('/posts', postsRoutes)
router.use('/tags', tagsRoutes)
router.use('/test', testRoutes)

export default router