import React from "react";

const Blogs = ({ blogs }) => {
  return (
    <div>
      {blogs.map((blog) => (
        <li className="note" key={blog.id}>
          {blog.title} - {blog.author} - {blog.url} - {blog.likes}
          {}
          {/* <button onClick={() => deletePerson(p)}>delete</button> */}
        </li>
      ))}
    </div>
  );
};

export default Blogs;
