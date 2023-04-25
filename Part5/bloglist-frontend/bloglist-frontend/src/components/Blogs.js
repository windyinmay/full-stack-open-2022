import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const Blogs = ({ blogs, deleteBlog }) => {
  return (
    //   <div>
    //     {blogs.map((blog) => (
    //       <li className="note" key={blog.id}>
    //         {blog.title}- {blog.author}- {blog.url}- {blog.likes}
    //         {}
    //         <button onClick={() => deleteBlog(blog)}>delete</button>
    //         ---***---
    //       </li>
    //     ))}
    //   </div>
    // );
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650, minHeight: 'auto' }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Blog's Title</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">URL</TableCell>
            <TableCell align="right">Likes</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs.map((blog) => (
            <TableRow
              key={blog.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {blog.title}
              </TableCell>
              <TableCell align="right">{blog.author}</TableCell>
              <TableCell align="right">{blog.url}</TableCell>
              <TableCell align="right">{blog.likes}</TableCell>
              <TableCell align="right">
                <button onClick={() => deleteBlog(blog)}>delete</button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
