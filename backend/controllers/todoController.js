import Todo from "../models/Todo.js";

export const getMyTodos = async (req, res) => {
  const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(todos);
};

export const createTodo = async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: "Text required" });
  const todo = await Todo.create({ text, user: req.user._id });
  res.status(201).json(todo);
};

export const toggleTodo = async (req, res) => {
  const todo = await Todo.findOne({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  todo.completed = !todo.completed;
  await todo.save();
  res.json(todo);
};

export const updateTodo = async (req, res) => {
  const { text, completed } = req.body;
  const todo = await Todo.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: { ...(text !== undefined && { text }), ...(completed !== undefined && { completed }) } },
    { new: true }
  );
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
};

export const deleteTodo = async (req, res) => {
  const todo = await Todo.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json({ success: true });
};
