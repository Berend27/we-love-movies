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

module.exports = {
    list,
    listIfIsShowing,
}