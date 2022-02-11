// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router();

const { validateId, validate } = require('./projects-middleware');


router.get('/', async (req, res) => {
    Projects.get()
    .then(list => {
        res.status(200).json(list)
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not get projects',
            err: err.message
        })
    })
})

router.get('/:id', validateId, async (req, res) => {
    console.log('req', req.query)
    const { id } = req.params;
        await Projects.get(id)
    res.status(200).json(req.project)
})


router.post('/', validate, (req, res) => {
    Projects.insert(req.body)
    .then(newProj => {
        res.status(201).json(newProj)
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not add new project'
        })
    })
})

router.put('/:id', validateId, validate, (req, res) => {
    const {id} = req.params;
    Projects.update(id, req.body)
    .then(updateProj => {
        res.status(200).json(updateProj);
    })
    .catch(err => {
        res.status(500).json({
            message: 'could not edit project'
        })
    })
})


module.exports = router;
