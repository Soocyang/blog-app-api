import { Exception } from '../config';
import PostModel from '../models/posts';

import { AppDataSource } from '../data-source';
import { Post } from '../entity/Post';
import { Repository } from 'typeorm';
import { generateFilters } from '../helpers/generateFilters';

class PostsService {
  model: PostModel
  postRepository: Repository<Post>
  constructor() {
    this.postRepository = AppDataSource.getRepository(Post)

    // @deprecated
    this.model = new PostModel()
  }

  async getPosts(filter: Partial<Post>) {
    const query = generateFilters<Partial<Post>>(filter, {
      id: 'regex',
      title: 'regex',
      created_at: 'datetime',
      is_published: 'boolean',
      modified_at: 'datetime',
    })

    const posts = await this.postRepository.find({
      select: {
        id: true,
        title: true,
        is_published: true,
        created_at: true,
        modified_at: true,
      },
      where: query,
      take: parseInt(filter?.limit || '10'),
      skip: parseInt(filter?.offset || '0'),
    })
    return posts
  }

  async createPost(payload: Partial<Post>) {
    return this.postRepository.save(payload)
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findOne({ where: { id } })
    if (!post) throw new Exception('E1001', 'Post not found', 404)
    return post
  }

  async updatePostById(id: string, payload: Partial<Post>) {
    return await this.postRepository.update(id, payload)
  }

  async deletePostById(id: string) {
    return await this.postRepository.delete(id)
  }
}

export const postService = new PostsService()