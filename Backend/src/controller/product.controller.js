const productService = require('../services/product.service.js')

const createProduct = async (req, res) => {

    try {

        const product = await productService.createProduct(req.body);

        return res.status(201).send(product)
    } catch (error) {

        return res.status(500).send({ error: error.message })
    }
}


const deleteProduct = async (req, res) => {
    const productId = await req.params.id;
    try {
        const product = await productService.deleteProduct(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const updateProduct = async (req, res) => {
    const productId = await req.params.id;
    try {
        const product = await productService.updateProduct(productId, req.body);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


const findProductById = async (req, res) => {
    const productId = await req.params.id;
    try {
        const product = await productService.findProductById(productId);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}   

const getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts(req.query);
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }    
}
const getEveryAllProducts = async (req, res) => {
    try {
        const products = await productService.getEveryAllProducts();
        return res.status(201).send(products)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const createMultipleProducts = async (req, res) => {
    const productId = await req.params.id;
    try {
        const product = await productService.createMultipleProduct(req.body);
        return res.status(201).send(product)
    } catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


module.exports = {
    createProduct,
    deleteProduct,
    updateProduct,
    getAllProducts,
    createMultipleProducts,
    findProductById,
    getEveryAllProducts
}