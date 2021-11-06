const knex = require("../db/connection");

// todo: map properties?

function list() {
    return knex("movies").select("*");
}

module.exports = {
    list,
}