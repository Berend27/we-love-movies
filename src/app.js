const moviesRouter = require("./movies/movies.router");
const reviewsRouter = require("./reviews/reviews.router");
const theatersRouter = require("./theaters/theaters.router");
if (process.env.USER) require("dotenv").config();
const express = require("express");

const errorHandler = require("./errors/errorHandler");
const notFound = require("./errors/notFound");

const app = express();

app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(errorHandler);
app.use(notFound);

module.exports = app;
