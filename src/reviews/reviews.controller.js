const asyncErrorBoundary = require("../errors/asyncErrorBoundry");
const criticsService = require("../critics/critics.service");
const reviewsService = require("./reviews.service");

// Validation

async function criticExists(req, res, next) {
    const critic = await criticsService.read(res.locals.review.critic_id);
    if (critic) {
        res.locals.critic = critic;
        return next();
    }
    next({ status: 404, message: `Critic cannot be found.` });
}

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

async function update(req, res, next) {
    const updatedReview = {
      ...req.body.data,
      review_id: res.locals.review.review_id,
      critic_id: res.locals.review.critic_id
    };
    await reviewsService.update(updatedReview);
    const data = await reviewsService.read(req.params.reviewId);
    data.critic = res.locals.critic; // todo: timestamp
    res.json({ data });
  }

module.exports = {
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(criticExists),
        asyncErrorBoundary(update)
    ],
}