// add middlewares here related to actions
const Actions = require('./actions-model');

module.exports = {
    validateActionId,
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