import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

router.get('/', async (req,res) => {
    try {
        const {name , sort , from , page = 1 , limit =10 } =req.query;

        const filter = {};
        if (name) filter.name = { $regex: name, $options: 'i'};
        if (from) filter.createdAt = { $gte: new Date(from) };

        const [field, order ] = sort ? sort.split(':') : ['createdAt', 'asc'];

        const skip = (page -1) * limit;

        const users = await User.find(filter)
        .sort({ [field]: order === 'desc' ? -1 : 1})
        .skip(skip)
        .limit(Number(limit));

        const totalUsers = await User.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers / limit );

        res.json({
            page: Number(page),
            totalPages,
            totalUsers,
            results: users,
        });
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

router.get('/:id', async (req,res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({error: 'User not found'});
        res.json(user);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.post('/', async (req,res) => {
    const {name , email , age } = req.body;
    try {
        const newUser = await User.create({name,email,age});
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.put('/:id', async (req,res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        if (!updatedUser) return res.status(404).json({error: 'User not found'});
        res.json(updatedUser);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({error:'User not found'});
        res.status(204).send();
    } catch (err) {
        res.status(400).json({error: err.message});
    }
});

export default router;