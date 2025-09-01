import Post from "../models/Post.js";

export const getMyPosts = async (req, res) => {
  const posts = await Post.find({ author: req.user._id }).sort({ createdAt: -1 });
  res.json(posts);
};

export const getPostById = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id, author: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ message: "Title and content required" });

  const post = await Post.create({ title, content, author: req.user._id });
  res.status(201).json(post);
};

export const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const post = await Post.findOneAndUpdate(
    { _id: req.params.id, author: req.user._id },
    { $set: { title, content } },
    { new: true }
  );
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json(post);
};

export const deletePost = async (req, res) => {
  const post = await Post.findOneAndDelete({ _id: req.params.id, author: req.user._id });
  if (!post) return res.status(404).json({ message: "Post not found" });
  res.json({ success: true });
};
