import PostModel from "../models/posts";
import { PostSchema } from "../types/db.types";

class PostsService {
  model: PostModel
  constructor() {
    this.model = new PostModel()
  }

  async getPosts() {
    const lists = await this.model.find()
    return lists
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