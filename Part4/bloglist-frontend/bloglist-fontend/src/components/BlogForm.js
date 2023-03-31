import * as React from "react";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

export default function BlogForm({ addBlog, newBlog, handleFormChange }) {
  return (
    // <div>
    //   <form onSubmit={addBlog}>
    //     <div>
    //       Title:
    //       <input
    //         name="title"
    //         type="text"
    //         value={newBlog.title}
    //         onChange={handleFormChange}
    //       />
    //     </div>
    //     <div>
    //       Author:
    //       <input
    //         name="author"
    //         type="text"
    //         value={newBlog.author}
    //         onChange={handleFormChange}
    //       />
    //     </div>
    //     <div>
    //       URL:
    //       <input
    //         name="url"
    //         type="text"
    //         value={newBlog.url}
    //         onChange={handleFormChange}
    //       />
    //     </div>
    //     <div>
    //       Likes:
    //       <input
    //         name="likes"
    //         type="number"
    //         value={newBlog.likes}
    //         onChange={handleFormChange}
    //       />
    //     </div>
    //     <div>
    //       <button type="submit">add</button>
    //     </div>
    //   </form>
    // </div>
    <Box
      component="form"
      sx={{
        "& > :not(style)": { m: 1 },
      }}
      noValidate
      autoComplete="off"
    >
      <FormControl>
        <TextField
          sx={{ marginBottom: 2 }}
          name="title"
          type="text"
          label="Title"
          value={newBlog.title}
          onChange={handleFormChange}
        />

        <TextField
          sx={{ marginBottom: 2 }}
          name="author"
          type="text"
          label="Author"
          value={newBlog.author}
          onChange={handleFormChange}
        />

        <TextField
          sx={{ marginBottom: 2 }}
          name="url"
          type="text"
          label="URL"
          value={newBlog.url}
          onChange={handleFormChange}
        />

        <TextField
          sx={{ marginBottom: 2 }}
          name="likes"
          label="Likes"
          type="number"
          value={newBlog.likes}
          onChange={handleFormChange}
        />
        <Button variant="outlined" color="success" onClick={addBlog}>
          Add New Blog
        </Button>
      </FormControl>
    </Box>
  );
}
