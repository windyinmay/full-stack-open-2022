const blogsRouter = require('express').Router();
const Blog = require('../models/blog');

// the below is promise way, blog.find() method returns a promise
// and we can access the result of the operation by registering a callback function
// with the then method.
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

//change to async and await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});
//get a blog by id
blogsRouter.get('/:id', async (request, response) => {
  const blogById = await Blog.findById(request.params.id);
  // try {
  if(blogById) {
    response.json(blogById);
  } else {
    response.status(404).end();
  }
  // } catch (exception) {
  //   next(exception);
  // no need to use catch if an exception occurs in an async route,
  //the execution is automatically passed to the error handling middleware.
}
  // Blog.findById(request.params.id)
  //   .then((blog) => {
  //     if (blog) {
  //       response.json(blog);
  //     } else {
  //       response.status(404).end();
  //     }
  //   })
  //   .catch((error) => next(error));
);

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blogObj = new Blog({
    title,
    author,
    url,
    likes,
  });

  try {
    if(!title && !url) {
      response.status(400).json({ error: 'Title or url is missing!' });
    }else {
      const savedBlog = await blogObj.save();
      response.status(201).json(savedBlog);
    }
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params._id);
  response.status(204).end();
});

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    blog,
    { new: true, runValidators: true, context: 'query' }
  );

  response.json(updatedBlog);

});

module.exports = blogsRouter;
