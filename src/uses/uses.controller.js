const path = require("path");
const uses = require(path.resolve("src/data/uses-data"));

function list(req, res, next){
    res.json({data: uses})
}

module.exports = {
    list
}