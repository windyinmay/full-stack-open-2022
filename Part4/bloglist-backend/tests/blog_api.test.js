const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(helper.initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[4]);
  await blogObject.save();
  blogObject = new Blog(helper.initialBlogs[5]);
  await blogObject.save();
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
}, 100000);

afterAll(async () => {
  await mongoose.connection.close();
});

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(6);
});

test('the first blog is written by Michael Chan', async () => {
  const response = await api.get('/api/blogs');
  expect(response.body[0].author.trimStart()).toBe('Michael Chan');
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs');

  const titles = response.body.map(blog => blog.title);
  expect(titles).toContain(
    'TDD harms architecture'
  );
});

test('unique identifier property of the blog posts is named id', async () => {
  await api
    .get('/api/blogs');

  const blogsAtEnd = await helper.blogsInDb();
  const verifyId = blogsAtEnd.map(blog => blog.id);

  expect(verifyId).toBeDefined();
});

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'This is a test',
    author: 'anh',
    url: 'https://abc',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  //   const response = await api.get('/api/blogs');
  const blogsAtEnd = await helper.blogsInDb();
  const titles = blogsAtEnd.map(blog => blog.title);

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
  expect(titles).toContain('This is a test');
});

test('blogs with likes property is missing will default to the value 0', async () => {
  const newBlog = {
    title: 'Testing the default value of likes',
    author: 'anh',
    url: 'https://',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map(blog => blog.likes);

  expect(likes[blogsAtEnd.length - 1]).toBe(0);
});

test('blog without title will not be added and returned 400', async () => {
  const newBlog = {
    title: '',
    author: 'anh',
    url: '',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});
