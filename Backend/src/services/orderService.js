const cartService = require('../services/cart.service.js')
const Address = require('../model/address.model.js');
const Order = require('../model/order.model.js');
const OrderItem = require('../model/orderItems.model.js')


const createOrder = async (user, shippAddress) => {
    try {
        let address;

        if (shippAddress._id) {
            let existAddress = await Address.findById(shippAddress._id);
            if (!existAddress) {
                throw new Error('Address not found');
            }
            address = existAddress;

        } else {
            address = new Address(shippAddress);
            address.user = user._id;
            await address.save();

            user.address.push(address);
            await user.save();

        }

        const cart = await cartService.findUserCart(user._id);
        const orderItems = [];


        for (const item of cart.cartItems) {
            const orderItem = new OrderItem({
                price: item.price,
                product: item.product,
                quantity: item.quantity,
                size: item.size,
                userId: item.userId,
                discountedPrice: item.discountedPrice,
            });

            const createdOrderItem = await orderItem.save();
            orderItems.push(createdOrderItem);
        }

        const createdOrder = new Order({
            user,
            orderItems,
            totalPrice: cart.totalPrice,
            totalDiscountedPrice: cart.totalDiscountedPrice,
            discount: cart.discount,
            totalItem: cart.totalItem,
            shippAddress: address,
        });

        const savedOrder = await createdOrder.save();


        return savedOrder;
    } catch (error) {

        throw error; // Re-throw the error for handling at the higher level
    }
};




const placeOrder = async (orderId) => {
    const order = await findOrderById(orderId);

    order.orderStatus = 'PLACED'
    order.paymentDetails.status = "COMPLETED"

    return await order.save();
}

const confirmedOrder = async (orderId) => {
    const order = await findOrderById(orderId);

    order.orderStatus = 'CONFIRMED'

    return await order.save();
}

const shipOrder = async (orderId) => {
    const order = await findOrderById(orderId);

    order.orderStatus = 'SHIPPED'

    return await order.save();
}

const deliverOrder = async (orderId) => {
    const order = await findOrderById(orderId);

    order.orderStatus = 'DELIVERED'

    return await order.save();
}

const cancelledOrder = async (orderId) => {
    const order = await findOrderById(orderId);

    order.orderStatus = 'CANCELLED'

    return await order.save();
}


const findOrderById = async (orderId) => {
    try {

        const order = await Order.findById(orderId)
            .populate('user')
            .populate({ path: 'orderItems', populate: { path: 'product' } })
            .populate('shippAddress');
        
        if (!order) {
            throw new Error(`Order not found with ID: ${orderId}`);
        }

        return order;
    } catch (error) {

        throw error; // rethrow the error to propagate it
    }
}


const userOrderHistory = async (userId) => {
    try {

        const orders = await Order.find({ user: userId, /*orderStatus: 'PLACED'*/ })
            .populate({ path: 'orderItems', populate: { path: 'product' } }).lean()

        return orders;
    } catch (error) {
        throw new Error(error.message)
    }
}

const getAllOrders = async () => {
    return await Order.find()
        .populate({ path: 'orderItems', populate: { path: 'product' } }).lean()
}

const deleteOrder = async (orderId) => {
    const order = await findOrderById(orderId)

    await Order.findByIdAndDelete(order._id)
}


module.exports = {
    createOrder, placeOrder, confirmedOrder, shipOrder, deliverOrder, cancelledOrder, userOrderHistory, getAllOrders, deleteOrder, findOrderById
}
