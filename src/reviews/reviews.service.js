const knex = require("../db/connection");

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
}

module.exports = {
    delete: destroy,
    read,
}