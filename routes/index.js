
const users = require('./user.route');
const event = require('./event.route');


module.exports = (router) => {
    // router.use('/shareData', shareDataRoute);
    router.use('/user', users);
    router.use('/event', event);
    // router.use('/wrapper', wrapper);
};