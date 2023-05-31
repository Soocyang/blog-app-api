import { Router } from 'express'


import { getPosts, createPost, deletePost, getPostById, updatePostById } from '../controllers/posts.controller'

const router = Router()

router.get('/', getPosts
  // #swagger.tags = ['posts']
  // #swagger.summary = 'Retrieve a list of posts'
);

router.get('/:id', getPostById
  /*
    #swagger.tags = ['posts']
    #swagger.summary = 'Retrieve a post details by id'
    #swagger.parameters['id'] = {
          in: 'path',
          description: 'Unique ID of the post to retrieve.',
          required: true,
          type: 'string',
          schema: 'string'
    } 
  */
);

router.post('/', createPost
  /*
    #swagger.tags = ['posts']
    #swagger.summary = 'Create a post'
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Post"
                    }  
                }
            }
    }
  */
);

router.put('/:id', updatePostById
  /*
    #swagger.tags = ['posts']
    #swagger.summary = 'Create a post'
    #swagger.parameters['id'] = {
          in: 'path',
          description: 'Unique ID of the post to update.',
          required: true,
          type: 'string',
          schema: 'string'
    } 
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Post"
                    }  
                }
            }
    }
  */
);

router.delete('/:id', deletePost
  /*
    #swagger.tags = ['posts']
    #swagger.summary = 'Delete a post by id'
    #swagger.parameters['id'] = {
          in: 'path',
          description: 'Unique ID of the post to delete.',
          required: true,
          type: 'string',
          schema: 'string'
    } 
  */
);


export default router