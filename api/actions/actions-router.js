// Write your "actions" router here!
const router = require('express').Router();

const Actions= require('./actions-model');

const { validateActionId, validateAction } = require('./actions-middlware');

router.get('/', (req, res, next) => {
    Actions.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(next)
})

router.get('/:id', validateActionId, async (req, res) => {
    const {id} = req.params;
    await Actions.get(id)
    res.status(200).json(req.action)
})

router.post('/', validateAction, (req, res, next) => {
    Actions.insert(req.body)
    .then(newAction => {
        res.status(201).json(newAction)
    })
    .catch(next)
})

router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
    .then(updateAction => {
        res.status(200).json(updateAction);
    })
    .catch(next)
})

router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
    .then(deleted => {
        res.json(deleted)
    })
    .catch(next)
})


module.exports = router;
