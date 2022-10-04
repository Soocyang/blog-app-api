import { Exception } from "../config";
import PostModel from "../models/posts";
import { KeyOfPostSchema, Pagination, PostSchema } from "../types/db.types";

class PostsService {
  model: PostModel
  constructor() {
    this.model = new PostModel()
  }

  async getPosts(filter: Partial<PostSchema>, pagination: Pagination) {
    const projects: KeyOfPostSchema[] = ['id', 'title', 'is_published', 'created_at', 'modified_at']
    return await this.model.find(filter, projects, pagination)
  }

  async createPost(payload: Partial<PostSchema>) {
    return await this.model.insertOne(payload)
  }

  async getPostById(id: string) {
    const post = await this.model.findOne({ id })
    if(!post) throw new Exception('E1001', 'Post not found', 404)
    return post
  }

  async updatePostById(id: string, payload: Partial<PostSchema>) {
    return await this.model.update({ id }, payload)
  }

  async deletePostById(id: string) {
    return await this.model.deleteOne(id)
  }
}

export const postService = new PostsService()