import { RequestHandler } from 'express'
import { catchAsync } from '../config';
import { postService } from '../services';
import { PostSchema } from '../types/db.types';

export const getPosts: RequestHandler = catchAsync(async (_req, res, _next) => {
  const posts = await postService.getPosts()
  res.json(posts)
})

export const createPost: RequestHandler = catchAsync(async (req, res, _next) => {
  const payload = req.body as Partial<PostSchema>
  const posts = await postService.createPost(payload)
  res.json(posts)
})

export const updatePost: RequestHandler = catchAsync(async (req, res, _next) => {
  const id  = req.params?.id
  const payload = req.body as Partial<PostSchema>
  const posts = await postService.updatePostById(id, payload)
  res.json(posts)
})


export const deletePost: RequestHandler = catchAsync(async (req, res, _next) => {
  const id  = req.params?.id
  const posts = await postService.deletePostById(id)
  res.json(posts)
})
