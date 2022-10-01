import { Request, Response, NextFunction, RequestHandler } from 'express'
import { postService } from '../services';
import { PostSchema } from '../types/db.types';

export const getPosts: RequestHandler = async (req, res, next) => {
  const posts = await postService.getPosts()
  res.json(posts)
}

export const createPost: RequestHandler = async (req, res, next) => {
  const payload = req.body as Partial<PostSchema>
  const posts = await postService.createPost(payload)
  res.json(posts)
}
