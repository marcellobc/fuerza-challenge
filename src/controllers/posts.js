const Post = require("../models/post");
const exceptionHelper = require("../helpers/exception");
const { paginatedResult } = require("../helpers/utils");

module.exports = {
  findAll: async (req, res) => {
    const posts = await paginatedResult(Post, req.query);
    return res.send(posts);
  },
  find: async (req, res) => {
    const post = await Post.findById(req.params.id);
    if (!post) throw exceptionHelper.notFound();
    return res.send(post);
  },
  create: async (req, res) => {
    const post = await Post.create(req.body);
    return res.send(post);
  },
  update: async ({ params, body }, res) => {
    const post = await Post.findByIdAndUpdate(params.id, body, { new: true });
    if (!post) throw exceptionHelper.notFound();
    return res.send(post);
  },
  delete: async (req, res) => {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) throw exceptionHelper.notFound();
    return res.send({ deleted: true });
  },
};
