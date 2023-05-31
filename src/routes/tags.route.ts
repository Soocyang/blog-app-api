import { Router } from 'express'


import { getTags, createTag, deleteTag, getTagById, updateTagById } from '../controllers/tags.controller'

const router = Router()

router.get('/', getTags
  // #swagger.tags = ['tags']
  // #swagger.summary = 'Retrieve a list of tags'
);

router.get('/:id', getTagById
  /*
  #swagger.tags = ['tags']
  #swagger.summary = 'Retrieve a tag details by id'
  #swagger.parameters['id'] = {
        in: 'path',
        description: 'Unique ID of the tag to retrieve.',
        required: true,
        type: 'string',
        schema: 'string'
  } 
*/
);

router.post('/', createTag
  /*
    #swagger.tags = ['tags']
    #swagger.summary = 'Create a tag'
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Tag"
                    }  
                }
            }
    }
  */
);

router.put('/:id', updateTagById
  /*
    #swagger.tags = ['tags']
    #swagger.summary = 'Update a tag by id'
    #swagger.parameters['id'] = {
          in: 'path',
          description: 'Unique ID of the tag to retrieve.',
          required: true,
          type: 'string',
          schema: 'string'
    } 
    #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/definitions/Tag"
                    }  
                }
            }
    }
  */
);

router.delete('/:id', deleteTag
/*
  #swagger.tags = ['tags']
  #swagger.summary = 'Delete a tag by id'
  #swagger.parameters['id'] = {
        in: 'path',
        description: 'Unique ID of the tag to delete.',
        required: true,
        type: 'string',
        schema: 'string'
  }
*/
);


export default router