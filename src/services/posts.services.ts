import { Exception } from '../config';
import { AppDataSource } from '../data-source';
import { Post } from '../entity/Post';
import { Repository } from 'typeorm';
import { generateFilters } from '../helpers/generateFilters';
import { convertBoolean } from '../helpers/convertBoolean';
import { Tag } from '../entity/Tag';

class PostsService {
  postRepository: Repository<Post>
  tagRepository: Repository<Tag>
  constructor() {
    this.postRepository = AppDataSource.getRepository(Post)
    this.tagRepository = AppDataSource.getRepository(Tag)
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

  async createPost(payload: Partial<Omit<Post, 'tags'>> & { tags: string[] }) {

    const tags: Tag[] = []
    // TODO: Enhancement to upsert tags wittout duplication
    if (payload.tags && payload.tags.length > 0) {
      payload.tags.forEach(async tagText => {
        const tagCode = tagText.split(' ').join('_').toUpperCase()
        tags.push({ code: tagCode, display_text: tagText } as Tag)
      })
    }
    const newPost: Partial<Post> = { ...payload, tags }
    return this.postRepository.save(newPost)
  }

  async getPostById(id: string) {
    const post = await this.postRepository.findOne({ select: {
      tags: {
        id: true,
        code: true,
        display_text: true
      }
    }, where: { id }, relations: { tags: true } })
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