const Review = require('../model/review.model.js')
const productService = require('../services/product.service.js')


const createReview = async (reqData, user)=>{
    const product = await productService.findProductById(reqData.productId)

    const review = new Review({
        user:user._id,
        product:product._id,
        review:reqData.review,
        createdAt:new Date()
    })
    const savedReview = await review.save();


        // Optionally, you can update the product with the rating information
        product.reviews.push(savedReview._id); // Assuming ratings is an array of Rating IDs in the Product model
        await product.save();


        return savedReview;
}


const getAllReview =async (productId) => {

    // const product = await productService.findProductById(reqData.productId)

    return await Review.find({product:productId}).populate('user')
}

module.exports = {
    createReview,
    getAllReview
}