import { RequestHandler } from 'express';
import { Post } from '../entity/Post';
import { catchAsync } from '../middleware';
import { postService } from '../services';

export const getPosts: RequestHandler = catchAsync(async (req, res, _next) => {
  const posts = await postService.getPosts(req.query)
  res.json(posts)
})

export const getPostById: RequestHandler = catchAsync(async (req, res, _next) => {
  const { id } = req.params
  const posts = await postService.getPostById(id)
  res.json(posts)
})

export const createPost: RequestHandler = catchAsync(async (req, res, _next) => {
  const payload = req.body as Partial<Omit<Post, 'tags'>> & { tags: string[]}
  const posts = await postService.createPost(payload)
  res.json(posts)
})

export const updatePostById: RequestHandler = catchAsync(async (req, res, _next) => {
  const id = req.params?.id
  const payload = req.body as Partial<Post>
  await postService.updatePostById(id, payload)
  const posts = await postService.getPostById(id)
  res.json(posts)
})


export const deletePost: RequestHandler = catchAsync(async (req, res, _next) => {
  const id = req.params?.id
  const posts = await postService.getPostById(id)
  await postService.deletePostById(id)
  res.json({ deleted: true, data: posts})
})
