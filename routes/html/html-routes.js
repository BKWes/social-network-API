const router = require('express').Router();
const path = require('path');
const Thought = require('../../models/Thought')

router.get('/', (req, res) => {
    Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData = () => {
            res.render("home")
        }).catch(err => res.status(500).json(err));
});

module.exports = router;