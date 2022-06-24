const router = require('express').Router();
const { Thought } = require('../models');

router.get("/", (req, res) => {
	console.log("======================");
	Thought.findAll({
		attributes: ["id", "thoughtText", "created_at", "username"],
		include: [
			{
				model: User,
				attributes: ["username"],
			},
			{
				model: Comment,
				attributes: [
					"id",
					"comment_text",
					"post_id",
					"user_id",
					"created_at",
				],
				include: {
					model: User,
					attributes: ["username"],
				},
			},
		],
	})
		.then((dbPostData) => {
			const posts = dbPostData.map((post) => post.get({ plain: true }));

			res.render("homepage", {
				posts,
				loggedIn: req.session.loggedIn,
			});
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json(err);
		});
});

const thoughtController = {
    // GET all thoughts
    getAllThoughts(req,res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v')
        .sort({ _id: -1 })
        .then(thoughtData => res.status(200).json(thoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //  GET single thought by _id (populate reactions)
    getOneThought({ params }, res) {
        Thought.findById({ _id: params.id })
        .populate({
            path: 'reactions',
            select: '-__v'
        }).select('-__v')
        .then(thoughtData => {
            if (!thoughtData) {
                return res.status(404).json({ message: ' No thought found with this ID' });
            }
            res.status(200).json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // POST new thought (push created _ID to user's thoughts)
    createThought({ params, body }, res) {
        Thought.create(body)
        .then(({ _id}) => {
            return User.findOneAndUpdate(
                { _id: params.userId },
                { $push: { thoughts: _id} },
                { new: true }
            );
        })
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'No user found with this ID' });
            }
            res.status(200).json(data);
        })
        .catch(err => res.status(500).json(err));
    },

    // PUT update thought by _id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }
            res.status(200).json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // DELETE thought by _id
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
        .then(thoughtData => {
            if (!thoughtData) {
                res.status(404).json({ message: 'No thought found with this ID' });
                return;
            }
            res.status(200).json(thoughtData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController;