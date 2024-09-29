const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Create a new post
router.post('/', async (req, res) => {
    const { title, content } = req.body;
    try {
        const newPost = new Post({ title, content });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Get a single post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);
    } catch (err) {
        res.status(404).json({ error: 'Post not found' });
    }
});

// Update a post by ID
// router.put('/:id', async (req, res) => {
//     try {
//         const { title, content } = req.body;
//         const updatedPost = await Post.findByIdAndUpdate(
//             req.params.id,
//             { title, content },
//             { new: true } // returns the updated document
//         );
//         res.status(200).json(updatedPost);
//     } catch (error) {
//         res.status(400).json({ message: 'Error updating post', error });
//     }
// });

// Update a post
router.put('/:id', async (req, res) => {
    const { title, content } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server Error' });
    }
});

module.exports = router;
