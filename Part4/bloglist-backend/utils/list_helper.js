var _ = require('lodash');
const dummy = (blogs) => {
  if(blogs.length >= 0) return 1;
};

const totalLikes = (blogs) => {
//   let sum = 0;
//   blogs.length >= 0 && blogs.map((blog) => {
//     sum += blog.likes;
//   });
  const sum = blogs.reduce((previous, current) => previous + current.likes, 0);
  return sum;
};

const favoriteBlog = (blogs) => {
//   let topLikes = 0;
//   blogs.length >= 0 && blogs.map((blog) => {
//     if(blog.likes > topLikes) topLikes = blog.likes;
//   });

  //   const findTheFavorite = blogs.find(x => x.likes === topLikes);
  //   const theFavoriteBlog = {
  //     title: findTheFavorite.title,
  //     author: findTheFavorite.author,
  //     likes: findTheFavorite.likes
  //   };
  const topLikes = blogs.reduce((prev, cur) => Math.max(prev, cur.likes), 0);
  const findTheFavorite = blogs.find(blog => blog.likes === topLikes);
  const theFavoriteBlog = {
    title: findTheFavorite.title,
    author: findTheFavorite.author,
    likes: findTheFavorite.likes
  };
  return theFavoriteBlog;
};

const mostBlogs = (blogs) => {
//   const countAuthor = _.countBy(blogs,'author');
//   const findTheBlog = _.map(countAuthor, (author, blog) => ({
//     author: author,
//     blog: blog,
//   }));
// const new2 = _.map(countAuthor, (key, value) => ({
//     author: key,
//     blog: value
//   }));
//   const newObj = {
//     author: Object.keys(countAuthor)[0],
//     blog: Object.values(countAuthor)[0]
//   };
//   return countAuthor;

  const countAuthor = _.map(_.countBy(blogs, 'author'), (blog, author) => ({
    author: author,
    blogs: blog
  }));
  const theMostBlog = countAuthor.reduce(
    (prev, current) => {
      return prev.blogs > current.blogs ? prev : current;
    }
  );
  return theMostBlog;
};

const mostLikes = (blogs) => {
  const findTheMostLikes = _.map(_.groupBy(blogs, 'author'), (likes, author) => ({
    author: author,
    likes: _.sumBy(likes, 'likes')
  }));
  const theMostLikes = _.orderBy(findTheMostLikes, 'likes', 'desc');
  return theMostLikes[0];
};

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
};