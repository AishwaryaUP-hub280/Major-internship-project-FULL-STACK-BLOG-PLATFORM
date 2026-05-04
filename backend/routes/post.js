const express = require("express");
const Post = require("../models/Post");
const auth = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", auth, async (req, res) => {
    const post = new Post({ ...req.body, userId: req.user.id });
    await post.save();
    res.json(post);
});

router.get("/", async (req, res) => {
    const posts = await Post.find();
    res.json(posts);
});

router.put("/:id", auth, async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: "Updated" });
});

router.delete("/:id", auth, async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
});

module.exports = router;