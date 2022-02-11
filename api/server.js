const express = require('express');
const server = express();

const projectsRouter = require('./projects/projects-router');
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

const { logger } = require('./projects/projects-middleware');

server.use(logger);

server.use('/api/projects', projectsRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
    res.send(`<h2>Sprint Challenge!</h2>`);
});

// server.use('*', (req, res) => {
//     res.status(404).json({
//         message: `${req.method} ${req.baseUrl} not found.`
//     })
// });


// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

module.exports = server;
