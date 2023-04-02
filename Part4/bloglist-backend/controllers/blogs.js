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

blogsRouter.get('/:id', (request, response, next) => {
  Blog.findById(request.params.id)
    .then((blog) => {
      if (blog) {
        response.json(blog);
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

blogsRouter.post('/', async (request, response, next) => {
  const { title, author, url, likes } = request.body;

  if (!title) {
    return response.status(400).json({
      error: 'title is missing',
    });
  }

  const blogObj = new Blog({
    title,
    author,
    url,
    likes,
  });
  //Recheck the find method below, it does not work yet
    Blog.find({ title: title, author: author })
      .then((blog) => {
        console.log(blog);
        if (blog.length > 0) {
          response.status(400).json({
            error: 'This blog already exists',
          });
        } else {
          blogObj
            .save()
            .then((savedBlog) => {
              console.log('blog saved!');
              response.status(201).json(savedBlog);
            })
            .catch((error) => next(error));
        }
      })
      .catch((error) => next(error));
  });

  // try {
  //   const savedBlog = await blogObj.save();
  //   response.status(201).json(savedBlog);
  // }catch(exception) {
  //   next(exception);
  // }
// });

blogsRouter.delete('/:id', (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put('/:id', (request, response, next) => {
  const { title, author, url, likes } = request.body;

  const blog = {
    title,
    author,
    url,
    likes,
  };

  Blog.findByIdAndUpdate(
    request.params.id,
    { blog },
    { new: true, runValidators: true, context: 'query' }
  )
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
