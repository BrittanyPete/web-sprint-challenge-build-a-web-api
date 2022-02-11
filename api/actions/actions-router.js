// Write your "actions" router here!
const router = require('express').Router();

const Actions= require('./actions-model');

router.get('/', (req, res) => {
    Actions.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not access actions',
            err: err.message
        })
    })
})


module.exports = router;
