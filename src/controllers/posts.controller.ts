import {
  Post,
  Put,
  Get,
  Delete,
  Route,
  Controller,
} from "tsoa";
import { RequestHandler } from 'express';
import { Post as PostEntity } from '../entity/Post';
import { catchAsync } from '../middleware';
import { postService } from '../services';

@Route("posts")
export class PostController extends Controller {

  @Get("/")
  public getPosts: RequestHandler = catchAsync(async (req, res, _next) => {
    const posts = await postService.getPosts(req.query)
    res.json(posts)
  })

  @Get("{userId}")
  public getPostById: RequestHandler = catchAsync(async (req, res, _next) => {
    const { id } = req.params
    const posts = await postService.getPostById(id)
    res.json(posts)
  })

  @Post()
  public createPost: RequestHandler = catchAsync(async (req, res, _next) => {
    const payload = req.body as Partial<Omit<PostEntity, 'tags'>> & { tags: string[] }
    const posts = await postService.createPost(payload)
    res.json(posts)
  })

  @Put()
  public updatePostById: RequestHandler = catchAsync(async (req, res, _next) => {
    const id = req.params?.id
    const payload = req.body as Partial<PostEntity>
    await postService.updatePostById(id, payload)
    const posts = await postService.getPostById(id)
    res.json(posts)
  })


  @Delete()
  public deletePost: RequestHandler = catchAsync(async (req, res, _next) => {
    const id = req.params?.id
    const posts = await postService.getPostById(id)
    await postService.deletePostById(id)
    res.json({ deleted: true, data: posts })
  })

}
