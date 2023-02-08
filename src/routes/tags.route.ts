import { Router } from 'express'


import { getTags, createTag, deleteTag, getTagById, updateTagById } from '../controllers/tags.controller'

const router = Router()

/**
 * @swagger
 * tags: 
 * - tags
 * summary: endpoint performs tags entities operations
 * 
 */

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Retrieve a list of tags
 *     tags: 
 *      - tags
 *     responses:
 *       200:
 *         description: Returns a list of tags
 */
router.get('/', getTags);

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Retrieve a tag details by id
 *     tags: 
 *      - tags
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Unique ID of the tag to retrieve.
 *             schema:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a tag details
 */
router.get('/:id', getTagById);

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Create a tag 
 *     tags: 
 *      - tags
 *     requestBody:
 *           required: true
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   title: 
 *                      type: string
 *                      example: How to Typescript
 *                   meta_title: 
 *                      type: string
 *                      example: Typescript
 *                   content: 
 *                      type: string
 *                      example: Lorem ipsum x1000
 *                   summary: 
 *                      type: string
 *                      example: Lorem ipsum
 *                   url_key: 
 *                      type: string
 *                      example: how_to_typescript
 *                   is_published: 
 *                      type: boolean
 *                      example: false
 *     responses:
 *       200:
 *         description: Returns the created tag
 */
router.post('/', createTag);

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Update a tag by id
 *     tags: 
 *      - tags
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Unique ID of the tag to retrieve.
 *        schema:
 *          type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title: 
 *                  type: string
 *                  example: How to Typescript
 *               meta_title: 
 *                  type: string
 *                  example: Typescript
 *               content: 
 *                  type: string
 *                  example: Lorem ipsum x1000
 *               summary: 
 *                  type: string
 *                  example: Lorem ipsum
 *               url_key: 
 *                  type: string
 *                  example: how_to_typescript
 *               is_published: 
 *                  type: boolean
 *                  example: false
 *     responses:
 *       200:
 *         description: Returns the updated tag details
 */
router.put('/:id', updateTagById);

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Delete a tag by id
 *     tags: 
 *      - tags
 *     parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: Unique ID of the tag to delete.
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: Returns the deleted process info
 */
router.delete('/:id', deleteTag);


export default router