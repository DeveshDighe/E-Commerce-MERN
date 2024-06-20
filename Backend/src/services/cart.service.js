const Cart = require("../model/cart.model");
const CartItem = require("../model/cartItem.model");
const Product = require("../model/product.model");


const createCart = async (user) => {

    try {

        const cart = new Cart({ user })

        const createdCart = await cart.save()
        return createdCart;


    } catch (error) {
        throw new Error(error.message)
    }
}

const findUserCart = async (userId) => {

    try {
        let cart = await Cart.findOne({ user: userId })


        let cartItems = await CartItem.find({ cart: cart._id }).populate('product');

        cart.cartItems = cartItems;

        let totalPrice = 0;
        let totalDiscountedPrice = 0;
        let totalItem = 0;
        // let discountedPrice = 0;

                // Iterate through each cart item to calculate totals
                for (const cartItem of cartItems) {
                    // Calculate total price by multiplying price by quantity
                    totalPrice += cartItem.price 
                    // Calculate total discounted price by multiplying discounted price by quantity
                    totalDiscountedPrice += cartItem.discountedPrice 
                    // Sum up total quantity
                    totalItem += cartItem.quantity;
                }
        
                // Calculate total discount
                const totalDiscount = totalPrice - totalDiscountedPrice;
        
                // Update cart object with calculated values
                cart.totalPrice = totalPrice;
                cart.totalDiscountedPrice = totalDiscountedPrice;
                cart.totalItem = totalItem;
                cart.discount = totalDiscount ;

                return cart;

    } catch (error) {
        throw new Error(error.message)
    }
}



const addCartItem = async (userId, req) => {
    try {

        const cart = await Cart.findOne({ user: userId })

        const product = await Product.findById(req.productId)
        const isPresent = await CartItem.findOne({ cart: cart._id, product: product._id, userId })

        if (!isPresent) {
            const cartItem = new CartItem({
                product: product._id,
                cart: cart._id,
                quantity: 1,
                userId,
                price: product.price,
                size: req.size,
                discountedPrice: product.discountedPrice,
            })

            const createdCartItem = await cartItem.save();
            cart.cartItems.push(createdCartItem);
            await cart.save();
            return 'Item added to cart'
        }
    } catch (error) {
        throw new Error(error.message)
    }
}

module.exports = { createCart, findUserCart, addCartItem }