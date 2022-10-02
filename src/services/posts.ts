import PostModel from "../models/posts";
import { KeyOfPostSchema, PostSchema } from "../types/db.types";

class PostsService {
  model: PostModel
  constructor() {
    this.model = new PostModel()
  }

  async getPosts(payload: Partial<PostSchema>) {
    const projects: KeyOfPostSchema[] = ['id', 'title', 'is_published', 'created_at', 'modified_at']
    return await this.model.find(payload, projects)
  }

  async createPost(payload: Partial<PostSchema>) {
    return await this.model.insertOne(payload)
  }

  getPostById() {

  }

  async updatePostById(id: string, payload: Partial<PostSchema>) {

  }

  async deletePostById(id: string) {
    return await this.model.deleteOne(id)
  }
}

export const postService = new PostsService()