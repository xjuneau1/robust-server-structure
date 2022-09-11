const router = require("express").Router({mergeParams: true})
const controller = require("./uses.controller")
const methodNotAllowed = require("../methodNotAllowed")

router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed)

router
    .route("/:useId")
    .get(controller.read)
    .delete(controller.delete)
    .all(methodNotAllowed)
module.exports = router