// add middlewares here related to actions
const Actions = require('./actions-model');

module.exports = {
    validateActionId,
    validateAction
}

async function validateActionId(req, res, next) {
    let id = req.params.id;
    let result = await Actions.get(id);
    if(!result) {
        res.status(404).json({
            message: 'action could not be found'
        });
    } else {
        req.action = result;
        next();
    }
}

async function validateAction(req, res, next) {
    const { project_id, description, notes, completed } = req.body;
    if(!project_id || !description || !notes || completed === undefined) {
        res.status(400).json({
            message: 'all fields are required'
        })
    } else {
        next();
    }
}