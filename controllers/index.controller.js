var exports = {};
exports.mainpage = (req, res, next) => {
    res.json({
        Hello: 'World'
    })
}
module.exports = exports;