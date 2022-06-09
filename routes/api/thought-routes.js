const router = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router 
 .route('/')
 .get(getAllThoughts)
 .post(createThought);

// /api/thoughts/:id
router
 .route('/:id')
 .get(getOneThought)
 .put(updateThought)
 .delete(deleteThought);

// add /thoughts/thoughtID/reactions POST and DELETE

module.exports = router;