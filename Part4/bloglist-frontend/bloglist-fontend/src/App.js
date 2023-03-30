import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    number: 0,
  });
  const [filter, setFilter] = useState("");
  const [updateMsg, setUpdateMsg] = useState(null);

  useEffect(() => {
    console.log("effect");
    blogService
      .getAll()
      .then((initialBlogs) => {
        console.log("promis fulfilled");
        setBlogs(initialBlogs);
      })
      .catch((err) => {
        console.log("fail");
      });
  }, []);

  const handleFormChange = (e) =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const handleFilter = (e) => setFilter(e.target.value.toLowerCase());

  const addBlog = (e) => {
    e.preventDefault();
    const existingBlogs = blogs.filter(
      (blog) => blog.title.toLowerCase() === newBlog.name.trim().toLowerCase()
    );

    if (existingBlogs.length > 0) {
      const confirmationMsg = window.confirm(
        `${newBlog.title} is already added to the blog list, replace the old information with the new one?`
      );

      confirmationMsg &&
        blogService
          .update(existingBlogs[0].id, newBlog)
          .then((updatedBlog) => {
            setBlogs(
              blogs.map((blog) =>
                blog.id === updatedBlog.id ? updatedBlog : blog
              )
            );
            setNewBlog({ title: "", author: "", url: "", number: 0 });
            setUpdateMsg(`Successfully updated blog ${updatedBlog.title}`);
            setTimeout(() => {
              setUpdateMsg(null);
            }, 5000);
            setBlogs(blogs.filter((blog) => blog.id !== updatedBlog.id));
          })
          .catch((error) => {
            setUpdateMsg("failed");
            setTimeout(() => setUpdateMsg(null), 5000);
          });
    } else {
      blogService
        .create(newBlog)
        .then((returnedBlog) => {
          setBlogs(blogs.concat(returnedBlog));
          setNewBlog({ title: "", author: "", url: "", number: 0 });
          setUpdateMsg(`Added ${returnedBlog.title}`);
          setTimeout(() => setUpdateMsg(null), 5000);
        })
        .catch((error) => {
          setUpdateMsg(error.res.data.error);
          setTimeout(() => setUpdateMsg(null), 5000);
          console.log(error.res.data.error);
        });
    }
  };

  const filterTitles =
    blogs.length > 0 &&
    blogs.filter((blog) => blog.title.toLowerCase().includes(filter));

  return (
    <div className="App">
      <h1>Blog list</h1>
      <Notification message={updateMsg} />
      <Filter handleFilter={handleFilter} />
      <h2>Add a new blog</h2>
      <BlogForm
        newBlog={newBlog}
        handleFormChange={handleFormChange}
        addBlog={addBlog}
      />
      <h2>List of the blogs</h2>
      {filterTitles.length > 0 && <Blogs blogs={filterTitles} />}
    </div>
  );
}

export default App;
