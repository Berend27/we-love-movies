const asyncErrorBoundary = require("../errors/asyncErrorBoundry");
const reviewsService = require("./reviews.service");

// Validation

async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    if (review) {
        res.locals.review = review;
        return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
}

// Route Handlers

async function destroy(req, res) {
    const { review } = res.locals;
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);
}

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
}