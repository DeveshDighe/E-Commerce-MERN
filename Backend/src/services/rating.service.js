const Rating = require('../model/rating.model.js')
const productService = require('../services/product.service.js')


const createRating = async (req, user) => {
    try {
        // Find the product by ID
        const product = await productService.findProductById(req.productId);


        // Create a new Rating instance
        const rating = new Rating({
            user: user._id,
            product: product._id,
            rating: req.rating,
            createdAt: new Date()
        });

        // Save the rating
        const savedRating = await rating.save();

        // Optionally, you can update the product with the rating information
        product.ratings.push(savedRating._id); // Assuming ratings is an array of Rating IDs in the Product model
        await product.save();

        return savedRating;
    } catch (error) {
        throw error; // Rethrow the error to handle it in the calling code
    }
}


const getProductRating =async (productId) => {
    return await Rating.find({product:productId})
}

module.exports = {
    createRating,
    getProductRating
}