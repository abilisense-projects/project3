module.exports = function() {
    // This is basic logger
    return function (req, res, next) {
        console.log(`Time: ${new Date()}`);
        if (next) next();
    }
}