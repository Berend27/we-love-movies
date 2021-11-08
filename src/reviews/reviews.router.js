const controller = require("./reviews.controller");
const router = require("express").Router();
const methodNotAllowed = require("../errors/methodNotAllowed");

router
    .route("/:reviewId")
    .delete(controller.delete)
    .all(methodNotAllowed);

module.exports = router;