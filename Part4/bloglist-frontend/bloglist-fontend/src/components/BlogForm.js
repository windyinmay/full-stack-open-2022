import React from "react";

export default function BlogForm({ addBlog, newBlog, handleFormChange }) {
  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          Title:
          <input
            name="title"
            type="text"
            value={newBlog.title}
            onChange={handleFormChange}
          />
        </div>
        <div>
          Author:
          <input
            name="author"
            type="text"
            value={newBlog.author}
            onChange={handleFormChange}
          />
        </div>
        <div>
          URL:
          <input
            name="url"
            type="text"
            value={newBlog.url}
            onChange={handleFormChange}
          />
        </div>
        <div>
          Likes:
          <input
            name="likes"
            type="number"
            value={newBlog.likes}
            onChange={handleFormChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
}
