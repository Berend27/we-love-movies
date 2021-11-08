const asyncErrorBoundary = require("../errors/asyncErrorBoundry");
const moviesService = require("./movies.service");

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found` });
}

async function list(req, res, next) {
    const data = req.query.is_showing ? 
        await moviesService.listIfIsShowing() :
        await moviesService.list();
    res.json({ data });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists), read],
}