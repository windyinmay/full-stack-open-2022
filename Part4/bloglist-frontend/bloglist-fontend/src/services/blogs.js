import axios from "axios";
const baseURL = "/api/blogs";

const getAll = () => {
  const request = axios.get(baseURL);

  return request.then((res) => res.data);
};

const create = (newBlog) => {
  const req = axios.post(baseURL, newBlog);
  return req.then((res) => res.data);
};

const update = (id, newBlog) => {
  const req = axios.put(`${baseURL}/${id}`);
  return req.then((res) => res.data);
};

const deleteBlog = (id) => {
  return axios.delete(`${baseURL}/${id}`);
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, update, deleteBlog };
