const Cart = require('../model/cart.model.js');
const CartItem = require('../model/cartItem.model');
const userService = require('../services/user.service.js')


const updateCartItem = async (userId, cartItemId, cartItemData) => {

    try {
        const item = await findCartItemById(cartItemId);

        if (!item) {
            throw new Error('cart item not found : ', cartItemId)
        }
        const user = await userService.findUserbyId(item.userId)

        if (!user) {
            throw new Error('user not found : ', userId)
        }

        if (user._id.toString() === userId.toString()) {
            item.quantity = cartItemData.quantity;
            item.price = item.quantity * item.product.price;
            item.discountedPrice = item.quantity * item.product.discountedPrice
            const updatedCartItem = await item.save();
            return updatedCartItem;
        }
        else {
            throw new Error('you cant update this cart item')
        }
    } catch (error) {
        throw new Error(error.message)
    }
}


const removeCartItem = async (userId, cartItemId) => {

    try {

        const cartItem = await findCartItemById(cartItemId)
        const user = await userService.findUserbyId(userId)



        if (user._id.toString() == cartItem.userId.toString()) {
            await CartItem.findByIdAndDelete(cartItemId)

            const cart = await Cart.findOne({ user: userId });

            if (!cart) {
                throw new Error("Cart not found for the user");
            }

            // Remove the cart item's reference from the cart's cartItems array
            cart.cartItems.pull(cartItemId);

            // Save the cart
            await cart.save();

            return cart;
        }
        else {
            throw new Error("you cant remove another user's item")
        }

    } catch (error) {
        throw new Error(error.message)
    }

}

const findCartItemById = async (cartItemId) => {

    const cartItem = await CartItem.findById(cartItemId).populate('product')

    if (cartItem) {
        return cartItem
    }
    else {
        throw new Error('cartItem not fount with this id', cartItem)
    }
}


module.exports = { updateCartItem, findCartItemById, removeCartItem }