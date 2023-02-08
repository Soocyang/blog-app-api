import { Exception } from '../config';

import { AppDataSource } from '../data-source';
import { Tag } from '../entity/Tag';
import { Repository } from 'typeorm';
import { generateFilters } from '../helpers/generateFilters';

class TagsService {
  postRepository: Repository<Tag>
  constructor() {
    this.postRepository = AppDataSource.getRepository(Tag)
  }

  async getTags(filter: Partial<Tag>) {
    const query = generateFilters<Partial<Tag>>(filter, {
      id: 'regex',
      code: 'exact',
      display_text: 'regex',
      color: 'exact',
      created_at: 'datetime',
      modified_at: 'datetime',
    })

    const posts = await this.postRepository.find({
      select: {
        id: true,
        code: true,
        display_text: true,
        color: true,
        created_at: true,
        modified_at: true,
      },
      where: query,
      take: parseInt(filter?.limit || '10'),
      skip: parseInt(filter?.offset || '0'),
    })
    return posts
  }

  async createTag(payload: Partial<Tag>) {
    return this.postRepository.save(payload)
  }

  async getTagById(id: string) {
    const post = await this.postRepository.findOne({ where: { id } })
    if (!post) throw new Exception('E1001', 'Tag not found', 404)
    return post
  }

  async updateTagById(id: string, payload: Partial<Tag>) {
    return await this.postRepository.update(id, payload)
  }

  async deleteTagById(id: string) {
    return await this.postRepository.delete(id)
  }
}

export const tagService = new TagsService()