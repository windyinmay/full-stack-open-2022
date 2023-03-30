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

  if (!title) {
    return response.status(400).json({
      error: "title is missing",
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
          error: `This blog already exists`,
        });
      } else {
        blogObj
          .save()
          .then((result) => {
            console.log("blog saved!");
            response.status(201).json(result);
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => next(error));
});

blogsRouter.delete("/:id", (request, response, next) => {
  Blog.findByIdAndRemove(request.params.id)
    .then(() => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

blogsRouter.put("/:id", (request, response, next) => {
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
    { new: true, runValidators: true, context: "query" }
  )
    .then((updatedBlog) => {
      response.json(updatedBlog);
    })
    .catch((error) => next(error));
});

module.exports = blogsRouter;
