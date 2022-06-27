const router = require('express').Router();
const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller');

//  /api/users
router
 .route('/')
 .get(getAllUsers)
 .post(createUser);

// /api/users/:id
router
 .route('/:id')
 .get(getUserById)
 .put(updateUser)
 .delete(deleteUser);

// add /users/:userId/friends/:friendId POST and DELETE
router.route('/users/:userId/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;