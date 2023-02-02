import { Router } from 'express'
import { catchAsync } from '../middleware'

import postsRoutes from './posts'

import { Post } from "../entity/Post"
import { AppDataSource } from '../data-source'

const router = Router()

router.use('/posts', postsRoutes)
router.get('/test', catchAsync(async (req, res, _next) => {

  const post = new Post()
  post.title = 'test typeorm'
  post.content = 'loremx1000'
  post.is_published = false
  post.summary = 'loremx1000'
  await AppDataSource.manager.save(post)
  console.log("Post has been saved. Post id is", post.id)

  res.json('test')
}))

export default router