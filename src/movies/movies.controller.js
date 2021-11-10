const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const criticsService = require("../critics/critics.service");
const moviesService = require("./movies.service");
const reviewsService = require("../reviews/reviews.service");
const theatersService = require("../theaters/theaters.service");

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({ status: 404, message: `Movie cannot be found` });
}

async function list(req, res) {
    const data = req.query.is_showing ? 
        await moviesService.listIfIsShowing() :
        await moviesService.list();
    res.json({ data });
}

async function listReviewsForMovie(req, res) {
    const data = await reviewsService.listForMovie(req.params.movieId);
    res.json({ data });
}

async function listTheatersWithMovie(req, res) {
    const data = await theatersService.listTheatersWithMovie(res.locals.movie.movie_id);
    res.json({ data });
}

async function read(req, res) {
    res.json({ data: res.locals.movie });
}

module.exports = {
    list: asyncErrorBoundary(list),
    listReviewsForMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviewsForMovie)],
    listTheatersWithMovie: [asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersWithMovie)],
    read: [asyncErrorBoundary(movieExists), read],
}