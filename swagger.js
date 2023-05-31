const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Blog API',
    description: 'This is a REST API application made with Express. It retrieves blog posts related data',
    version: '1.0.0',
  },
  host: 'localhost:4000',
  servers: [
    {
      url: "http://localhost:4000/",
      description: "local server"
    },
  ],
  tags: [
    {
      name: 'posts',
    },
    {
      name: 'tags',
    },
  ],
  definitions: {
    Post: {
      title: 'How to Typescript',
      meta_title: 'Typescript',
      content: 'Lorem ipsum x1000',
      summary: 'Lorem ipsum',
      url_key: 'how_to_typescript',
      is_published: false,
    },
    Tag: {
      code: 'GIT',
      display_text: 'Git',
      color: 'Orange',
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/routes/index.ts'];

/* NOTE: if you use the express Router, you must pass in the 
   'endpointsFiles' only the root file where the route starts,
   such as index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);