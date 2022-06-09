const { User } = require('../models');

const userController = {
    // GET ALL users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(userData => res.status(200).json(userData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // GET single user by _id (w/ populated thought and friend data)
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID' });
                return;
            }
            res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // POST new user
    createUser({ body }, res) {
        User.create(body)
        .then(userData => res.status(200).json(userData))
        .catch(err => res.status(500).json(err))
    },

    // PUT user using _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID' });
                return;
            }
            res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE user by _id **bonus remove user's associated thoughts on deletion**
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(userData => {
            if (!userData) {
                res.status(404).json({ message: 'No user found with this ID' });
                return;
            }
            res.status(200).json(userData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = userController;