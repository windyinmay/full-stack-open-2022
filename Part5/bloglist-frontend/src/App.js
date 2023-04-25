import React, { useState, useEffect } from "react";

import blogService from "./services/blogs";
import loginService from './services/login'

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import Blogs from "./components/Blogs";
import BlogForm from "./components/BlogForm";

import Container from "@mui/material/Container";


const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setUpdateMsg('Wrong credentials')
      setTimeout(() => {
        setUpdateMsg(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const handleFormChange = (e) =>
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });

  const handleFilter = (e) => setFilter(e.target.value.toLowerCase());

  const addBlog = (e) => {
    e.preventDefault();
    const existingBlogs = blogs.filter(
      (blog) => blog.title.toLowerCase() === newBlog.title.trim().toLowerCase()
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
            setNewBlog({ title: "", author: "", url: "", likes: 0 });
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
          setNewBlog({ title: "", author: "", url: "", likes: 0 });
          setUpdateMsg(`Added ${returnedBlog.title}`);
          setTimeout(() => setUpdateMsg(null), 5000);
        })
        .catch((error) => {
          setUpdateMsg(error.response.data.error);
          setTimeout(() => setUpdateMsg(null), 5000);
          console.log(error.response.data.error);
        });
    }
  };

  const deleteBlog = (blog) => {
    const { id, title } = blog;
    const confirmationMsg = window.confirm(`Delete the blog ${title}?`);

    confirmationMsg &&
      blogService
        .deleteBlog(id)
        .then(() => {
          const updatedBlog = blogs.filter((blog) => blog.id !== id);
          setUpdateMsg(`${blog.title} has been removed.`);
          setTimeout(() => setUpdateMsg(null), 5000);
          setBlogs(updatedBlog);
        })
        .catch((error) => {
          setUpdateMsg(
            `The blog with the title '${blog.title}' was removed from the server`
          );
          setTimeout(() => setUpdateMsg(null), 5000);
          setBlogs(blogs.filter((blog) => blog.id !== id));
        });
  };
  const filterTitles =
    blogs.length > 0 &&
    blogs.filter((blog) => blog.title.toLowerCase().includes(filter));

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <input 
        value={newBlog}
        onChange={handleFormChange}/>
      <button type="submit">Save</button>
    </form>
  )
  return (
    <div>
  
      <h1>Blog list</h1>
      <Notification message={updateMsg} />

      {user === null ? loginForm() : (
      <div>
        <p>{user.name} logged in</p>
        <Filter handleFilter={handleFilter} />
        <h2>Add a new blog</h2>
        <BlogForm
          newBlog={newBlog}
          handleFormChange={handleFormChange}
          addBlog={addBlog}
        />
        <h2>List of the blogs</h2>
        {filterTitles.length > 0 && (
          <Blogs blogs={filterTitles} deleteBlog={deleteBlog} />
        )}
      </div>
      )}
    </div>
    // </Container>
  );
};

export default App;
