const dummy = (blogs) => {
  if(blogs.length >= 0) return 1;
};

const totalLikes = (blogs) => {
  let sum = 0;
  blogs.length >= 0 && blogs.map((blog) => {
    sum += blog.likes;
  });
  return sum;
};

module.exports = {
  dummy, totalLikes
};