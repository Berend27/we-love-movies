const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const moviesService = require("./movies.service");
const theatersService = require("../theaters/theaters.service");

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

async function listTheatersWithMovie(req, res, next) {
    const data = await theatersService.listTheatersWithMovie(res.locals.movie.movie_id);
    res.json({ data });
}

async function read(req, res, next) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    listTheatersWithMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersWithMovie)],
    read: [asyncErrorBoundary(movieExists), read],
}