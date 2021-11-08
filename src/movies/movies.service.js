const knex = require("../db/connection");

// todo: map properties?

function list() {
    return knex("movies").select("*");
}

function listIfIsShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where("is_showing", true);
}

function read(movie_id) {
    return knex("movies")
        .select("*")
        .where({ movie_id })
        .first();
}

module.exports = {
    list,
    listIfIsShowing,
    read,
}