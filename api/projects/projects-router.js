// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

const { validateId, validate } = require('./projects-middleware');


router.get('/', async (req, res, next) => {
    Projects.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(next)
})

router.get('/:id', validateId, async (req, res) => {
    console.log('req', req.query)
    const { id } = req.params;
        await Projects.get(id)
    res.status(200).json(req.project)
})


router.post('/', validate, (req, res, next) => {
    Projects.insert(req.body)
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(next)
})

router.put('/:id', validateId, validate, (req, res, next) => {
    const {id} = req.params;
    Projects.update(id, req.body)
    .then(updateProj => {
        res.status(200).json(updateProj);
    })
    .catch(next)
})

router.delete('/:id', validateId, async (req, res, next) => {
    Projects.remove(req.params.id)
    .then(deleted => {
        res.json(deleted)
    })
    .catch(next)
})

router.get('/:id/actions', validateId, async (req, res, next) => {
    await Projects.get(req.params.id)
    const actions = await Projects.getProjectActions(req.params.id);
    res.status(200).json(actions);
})


module.exports = router;
