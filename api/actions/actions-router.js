// Write your "actions" router here!
const router = require('express').Router();

const Actions= require('./actions-model');

const { validateActionId } = require('./actions-middlware');

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

router.get('/:id', validateActionId, async (req, res) => {
    const {id} = req.params;
    await Actions.get(id)
    res.status(200).json(req.action)
})


module.exports = router;
