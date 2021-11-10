const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritic = mapProperties({
    critic_id: 'critic.critic_id',
    preferred_name: 'critic.preferred_name',
    surname: 'critic.surname',
    organization_name: 'critic.organization_name',
})

function destroy(review_id) {
    return knex("reviews").where({ review_id }).del();
}

function listForMovie(movie_id) {
    return knex("reviews as r")
        .join("critics as c", "r.critic_id", "c.critic_id")
        .select("*")
        .where({ movie_id })
        .then((data) => {
            const reviews = [];
            data.forEach((item) => {
                const appendedObject = addCritic(item);
                reviews.push(appendedObject);
            });
            return reviews;
        });
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
    listForMovie,
    read,
    update,
}
