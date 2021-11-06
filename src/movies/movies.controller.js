const asyncErrorBoundary = require("../errors/asyncErrorBoundry");
const moviesService = require("./movies.service");

async function list(req, res, next) {
    const data = await moviesService.list();
    res.json({ data });
}

module.exports = {
    list: asyncErrorBoundary(list),
}