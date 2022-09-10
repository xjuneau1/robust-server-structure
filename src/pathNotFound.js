function pathNotFound(req, res, next){
    next(`Not found: ${req.originalUrl}`);
  }

  module.exports = [
    pathNotFound
  ];