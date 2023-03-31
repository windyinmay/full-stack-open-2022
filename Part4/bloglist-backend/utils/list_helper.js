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

module.exports = {
  dummy, totalLikes, favoriteBlog
};