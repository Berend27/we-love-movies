const knex = require("../db/connection");

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

function read(review_id) {
    return knex("reviews").select("*").where({ review_id }).first();
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview, "*")
        .then((updatedRecords) => updatedRecords[0]);
}

module.exports = {
    delete: destroy,
    read,
    update,
}
