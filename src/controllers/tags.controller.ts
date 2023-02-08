import { RequestHandler } from 'express';
import { Tag } from '../entity/Tag';
import { catchAsync } from '../middleware';
import { tagService } from '../services';

export const getTags: RequestHandler = catchAsync(async (req, res, _next) => {
  const tags = await tagService.getTags(req.query)
  res.json(tags)
})

export const getTagById: RequestHandler = catchAsync(async (req, res, _next) => {
  const { id } = req.params
  const tags = await tagService.getTagById(id)
  res.json(tags)
})

export const createTag: RequestHandler = catchAsync(async (req, res, _next) => {
  const payload = req.body as Partial<Tag>
  const tags = await tagService.createTag(payload)
  res.json(tags)
})

export const updateTagById: RequestHandler = catchAsync(async (req, res, _next) => {
  const id = req.params?.id
  const payload = req.body as Partial<Tag>
  await tagService.updateTagById(id, payload)
  const tags = await tagService.getTagById(id)
  res.json(tags)
})


export const deleteTag: RequestHandler = catchAsync(async (req, res, _next) => {
  const id = req.params?.id
  const tags = await tagService.getTagById(id)
  await tagService.deleteTagById(id)
  res.json({ deleted: true, data: tags})
})
