const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./test_helper.test');
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
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length + 1);

  const authors = blogsAtEnd.body.map(blog => blog.author);
  expect(authors).toContain('This is a test');
});

test('blog without author will not be added', async () => {
  const newBlog = {
    author: 'anh',
    url: 'https://abc',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.body).toHaveLength(helper.initialBlogs.length);
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

// tests below are tested based on real time database set
// test('there are two blogs', async () => {
//   const response = await api.get('/api/blogs');

//   expect(response.body).toHaveLength(2);
// });

// test('the first blog is written by Muhammad Asad Iqbal Khan', async () => {
//   const response = await api.get('/api/blogs');
//   expect(response.body[0].author.trimStart()).toBe('Muhammad Asad Iqbal Khan');
// });