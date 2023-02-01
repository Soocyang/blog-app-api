import { Router } from 'express'


import { getPosts, createPost, deletePost, getPostById, updatePostById } from '../controllers/posts'

const router = Router()

/**
 * @swagger
 * /posts:
 *   get:
 *     description: Retrieve a list of posts
 *     responses:
 *       200:
 *         description: Returns a list of posts
 */
router.get('/', getPosts);

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     description: Retrieve a post details by id
 *     parameters:
 *           - in: path
 *             name: id
 *             required: true
 *             description: Numeric ID of the post to retrieve.
 *             schema:
 *               type: string
 *     responses:
 *       200:
 *         description: Returns a post details
 */
router.get('/:id', getPostById);

/**
 * @swagger
 * /posts:
 *   post:
 *     description: Create a post 
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
 *         description: Returns the created post
 */
router.post('/', createPost);

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     description: Update a post by id
 *     responses:
 *       200:
 *         description: Returns the updated post details
 */
router.put('/:id', updatePostById);

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     description: Delete a post by id
 *     responses:
 *       200:
 *         description: Returns the deleted process info
 */
router.delete('/:id', deletePost);


export default router