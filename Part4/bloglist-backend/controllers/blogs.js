// const jwt = require('jsonwebtoken');
const blogsRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');
const { userExtractor } = require('../utils/middleware');

// the below is promise way, blog.find() method returns a promise
// and we can access the result of the operation by registering a callback function
// with the then method.
// blogsRouter.get('/', (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// const getTokenFrom = request => {
//   const authorization = request.get('authorization');
//   if (authorization && authorization.startsWith('Bearer ')) {
//     return authorization.replace('Bearer ', '');
//   }
//   return null;
// };


//change to async and await
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
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

blogsRouter.post('/',userExtractor, async (request, response, next) => {
  const body = request.body;

  // const decodedToken = jwt.verify(request.token, process.env.SECRET);
  // if (!decodedToken.id) {
  //   return response.status(401).json({ error: 'token invalid' });
  // }
  const user = await User.findById(request.user.id);
  blog.user = user._id;

  const blog = new Blog({
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes,
    user: user.id
  });

  try {
    if(!body.title && !body.url) {
      response.status(400).json({ error: 'Title or url is missing!' });
    }else {
      blog.likes = blog.likes ? blog.likes : 0;
      const savedBlog = await blog.save();
      user.blogs = user.blogs.concat(savedBlog._id);
      await user.save();

      response.status(201).json(savedBlog);
    }
  } catch(exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  const user = await User.findById(request.user.id);

  if (blog.user.toString() === request.user.id.toString()) {
    await Blog.findByIdAndRemove(request.params.id);
    user.blogs = user.blogs.filter(u => u.toString() !== request.user.id);
    await user.save();

    response.status(204).end();
  } else {
    return response.status(401).json({ error: 'blog can only be deleted by the right user' });
  }
});


blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  if(!blog.title && !blog.url) {
    response.status(400).send({ error: 'title or url missing' });
  }else {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      blog,
      { new: true, runValidators: true, context: 'query' }
    );

    response.json(updatedBlog);
  }
});

module.exports = blogsRouter;
