// add middlewares here related to projects
const Projects = require('./projects-model');

module.exports = {
    logger,
    validateId,
    validate,
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


async function validate (req, res, next) {
    const { name , description, completed } = req.body;
    if (!name || !description || completed === undefined ) {
        res.status(400).json({
            message: 'please enter all fields'
        })
    } else {
        next();
    }
}