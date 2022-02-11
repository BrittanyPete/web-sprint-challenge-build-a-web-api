// Write your "actions" router here!
const router = require('express').Router();

const Actions= require('./actions-model');

const { validateActionId, validateAction } = require('./actions-middlware');

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

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not access actions',
            err: err.message
        })
    })
})

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(updateAction => {
        res.status(200).json(updateAction);
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not access actions',
            err: err.message
        })
    })
})


module.exports = router;
