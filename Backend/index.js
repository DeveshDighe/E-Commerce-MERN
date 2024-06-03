const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.json())

const corsOptions = {
    origin: 'https://e-commerce-mern-project-devesh-dighe.vercel.app', // Allow only this origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: ['Content-Type', 'Authorization'],
    optionsSuccessStatus: 200
};


app.use(cors(corsOptions))



app.get('/', (req, res) => {
    return res.status(200).json({ message: 'welcome to ecommerce api', status: true })
})

const authRouters = require('./src/routes/auth.routes.js')
app.use('/auth', authRouters)

const userRouters = require('./src/routes/user.routes.js')
app.use('/api/users', userRouters)

const productRouter = require('./src/routes/product.routes.js')
app.use('/api/products', productRouter)

const adminProductRouter = require('./src/routes/adminProduct.routes.js')
app.use('/api/admin/products', adminProductRouter)

const cartRouter = require('./src/routes/cart.routes.js')
app.use('/api/cart', cartRouter)

const cartItemRouter = require('./src/routes/cartItem.routes.js')
app.use('/api/cart_items', cartItemRouter)

const orderRouter = require('./src/routes/order.routes.js')
app.use('/api/orders', orderRouter)

const adminOrderRouter = require('./src/routes/adminOrder.routes.js')
app.use('/api/admin/orders', adminOrderRouter)

const reviewRouter = require('./src/routes/review.routes.js')
app.use('/api/reviews', reviewRouter)

const ratingRouter = require('./src/routes/rating.routes.js')
app.use('/api/ratings', ratingRouter)

module.exports = app;