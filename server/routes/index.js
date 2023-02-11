const clientRouter = require('./clientRouter');
const workerRouter = require('./workerRouter');
const chatRouter = require('./chatRouter');
const jobRouter = require('./jobRouter');
const adminRouter = require('./adminRouter');

module.exports = {
    clientRouter,
    chatRouter,
    jobRouter,
    adminRouter,
    workerRouter
}