const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required!'],
    minlength: 5,
  },
  author: { type: String, required: [true, 'Author is required!'], minlength: 3 },
  url: { type: String, required: [true, 'URL is required!'], minlength: 3 },
  likes: { type: Number, default: 0 },
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
