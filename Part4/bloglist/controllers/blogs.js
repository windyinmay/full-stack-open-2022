const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

blogsRouter.get("/:id", (request, response, next) => {
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

blogsRouter.post("/", (request, response, next) => {
  const { title, author, url, likes } = request.body;
  const blogObj = new Blog({
    title: title,
    author: author,
    url: url,
    likes: likes,
  });
  Blog.find({ title: title }).then((blog) => {
    if (blog.length > 0) {
      response.status(400).json({
        error: `Blog's title already exists`,
      });
    }
  });
  blogObj
    .save()
    .then((result) => {
      response.status(201).json(result);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
