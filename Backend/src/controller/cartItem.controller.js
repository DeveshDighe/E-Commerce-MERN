const cartItemService = require('../services/cartItem.service.js')
const cartService = require('../services/cart.service.js')


const updateCartItem =async (req,res) =>{

    const user = await req.user

    try {
        const updatedCartItem = await cartItemService.updateCartItem(user._id, req.params.id, req.body )

        return res.status(200).send(updatedCartItem)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}


const removeCartItem =async (req,res) =>{
    const user = await req.user


    try {
        const cartItem =await   cartItemService.removeCartItem(user._id, req.params.id )
        const getCart = await cartService.findUserCart(user._id)

        return res.status(200).send(getCart)
    } catch (error) {
        return res.status(500).send({error:error.message})
    }
}

module.exports = {
    updateCartItem,
    removeCartItem
}