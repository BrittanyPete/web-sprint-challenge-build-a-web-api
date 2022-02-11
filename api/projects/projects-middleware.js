// add middlewares here related to projects
const Projects = require('./projects-model');

module.exports = {
    logger,
    validateId,
    validateProj,
    // validateAction
};

function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] to ${req.method} from ${req.originalUrl}`
    );
    next();
  }

async function validateId(req, res, next) {
    let id = req.params.id;
    let result = await Projects.get(id);
    if(!result) {
        res.status(404).json({
            message: `project not found`
        });
    } else {
        req.project = result;
        next();
    }
}

async function validateProj(req, res, next) {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: 'please enter all fields'
        })
    } else {
        next();
    }
}