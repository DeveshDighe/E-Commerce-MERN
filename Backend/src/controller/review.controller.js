const reviewService = require('../services/review.service.js')

const createReview = async (req, res) => {
    const user =await req.user;

    try {
        const review = await reviewService.createReview(req.body, user)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getAllReviews = async (res, req) => {
    const productId =await req.params.productId
    try {
        const review = await reviewService.getAllReview(productId)
        return res.status(201).send(review)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    createReview,
    getAllReviews
}