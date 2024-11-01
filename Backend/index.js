const express = require('express')
const cors = require('cors')
const  mongoose  = require("mongoose");
const dotenv = require('dotenv')
const cron = require('node-cron');
const app = express()
dotenv.config()
app.use(express.json())
app.use(cors()) 

app.get('/', (req, res) => {
    return res.status(200).json({ message: 'welcome to ecommerce api', status: true })
})


    app.get('/ser', (req, res) => {
        return res.status(200).json({ message: 'welcome to ecommerce apiiiiii', status: true })
    })


// cron.schedule('*/10 * * * *', async () => {
//     try {
//       const response = await axios.get(`${process.env.BACK_SERVER_URL}`);
//       console.log('Request successful:', response.data);
//     } catch (error) {
//       console.error('Error making request:', error.message);
//     }
//   }, {
//     timezone: 'Asia/Kolkata'
//   });

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

const ratingRouter = require('./src/routes/rating.routes.js');
const { default: axios } = require('axios');
app.use('/api/ratings', ratingRouter)


const PORT = 8000;

app.listen(PORT, async () => {
    console.log('E-Commerce api listening on Port : ', PORT);
})

mongoose.connect(process.env.mongodbUrl).then(()=>{
    console.log('DB connected');
}).catch((err)=>{
    console.log("Error in db connection : ", err);
})


module.exports = app;
