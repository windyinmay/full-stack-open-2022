import React from "react";

const Blogs = ({ blogs, deleteBlog }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <li className="note" key={blog.id}>
          {blog.title}- {blog.author}- {blog.url}- {blog.likes}
          {}
          <button onClick={() => deleteBlog(blog)}>delete</button>
          ---***---
        </li>
      ))}
    </div>
  );
};

export default Blogs;
