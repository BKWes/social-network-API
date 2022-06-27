const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
 .route('/')
 .get(getAllThoughts)
 .post(createThought);

// /api/thoughts/:id
router
 .route('/:id')
 .get(getThoughtById)
 .put(updateThought)
 .delete(deleteThought);

// add /thoughts/thoughtID/reactions POST and DELETE
router.route('/:thoughtId/reaction').post(createReaction);
router.route('/:thoughtId/reactionId').delete(deleteReaction);

module.exports = router;