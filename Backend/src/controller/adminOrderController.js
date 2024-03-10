const orderService = require('../services/orderService.js')

const getAllOrders = async (req, res) => {

    try {
        const orders = await orderService.getAllOrders();
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const confirmOrders = async (req, res) => {
    const orderId = await req.params.orderId;

    try {
        const orders = await orderService.confirmedOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const shippOrders = async (req, res) => {
    const orderId = await req.params.orderId;

    try {
        const orders = await orderService.shipOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const deliverOrders = async (req, res) => {
    const orderId = await req.params.orderId;

    try {
        const orders = await orderService.deliverOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const cancelledOrders = async (req, res) => {
    const orderId = await req.params.orderId;

    try {
        const orders = await orderService.cancelledOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const deleteOrders = async (req, res) => {
    const orderId = await req.params.orderId;

    try {
        const orders = await orderService.deleteOrder(orderId);
        return res.status(200).send(orders);
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

module.exports = {
    getAllOrders,
    confirmOrders,
    shippOrders,
    deliverOrders,
    cancelledOrders,
    deleteOrders
}