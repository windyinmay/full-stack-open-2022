const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('../utils/test_helper');
const app = require('../app');
const api = supertest(app);


const Blog = require('../models/blog');

// beforeEach(async () => {
//   await Blog.deleteMany({});
//   let blogObject = new Blog(helper.initialBlogs[0]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[1]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[2]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[3]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[4]);
//   await blogObject.save();
//   blogObject = new Blog(helper.initialBlogs[5]);
//   await blogObject.save();
// });

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  const blogObjects = helper.initialBlogs.map(b => new Blog(b));
  const promiseArray = blogObjects.map(b => b.save());
  await Promise.all(promiseArray);
},5000);

describe('when there is initially some blogs saved', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
  }, 100000);

  afterAll(async () => {
    await mongoose.connection.close();
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

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(6);
  });
});

describe('viewing a specific blog', () => {
  test('the first blog is written by Michael Chan', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].author.trimStart()).toBe('Michael Chan');
  });

  test('unique identifier property of the blog posts is named id', async () => {
    await api
      .get('/api/blogs');

    const blogsAtEnd = await helper.blogsInDb();
    const verifyId = blogsAtEnd.map(blog => blog.id);

    expect(verifyId).toBeDefined();
  });

});

describe('addition of a new blog', () => {
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
});

// describe('deletion of a blog', () => {
//   //not working yet at the moment, go back and check later
//   test('deleting a single blog by id', async () => {
//     const blogToBeDeleted = await helper.blogsInDb();
//     const idOfBlogDeleted = blogToBeDeleted[0].id;

//     await api
//       .delete(`/api/blogs/${idOfBlogDeleted}`)
//       .expect(204);

//     const blogsAtEnd = await helper.blogsInDb();
//     expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

//     const idsAtEnd = blogsAtEnd.map(blog => blog.id);
//     expect(idsAtEnd).not.toContain(idOfBlogDeleted);
//     debug(`Value of idOfBlogDeleted: ${idOfBlogDeleted}`);
//   });
// });

describe('updating a blog', () => {
  test('updating the information of an individual blog post', async () => {
    const newBlog = {
      title: 'test the update function',
      author: 'me',
      url: 'https://something something',
      likes: 12
    };

    const blogToBeUpdated = await helper.blogsInDb();
    const idOfBlogToBeUpdated = blogToBeUpdated[0].id;
    await api
      .put(`/api/blogs/${idOfBlogToBeUpdated}`)
      .send(newBlog);

    const blogsAtEnd = await helper.blogsInDb();
    // const updatedBlog = blogsAtEnd[0];

    const newLikes = blogsAtEnd.map(blog => blog.likes);
    expect(newLikes).toContain(12);
  });
});
