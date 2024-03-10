import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../Customer/Pages/HomePage/HomePage'
import Cart from '../Customer/Components/Cart/Cart'
import Footer from '../Customer/Components/Footer/Footer'
import Navigation from '../Customer/Components/Navigation/Navigation.jsx'
import Product from '../Customer/Components/Product/Product.jsx'
import ProductDetails from '../Customer/Components/ProductDetails/ProductDetails.jsx'
import CheckOut from '../Customer/Components/CheckOut/CheckOut.jsx'
import Order from '../Customer/Components/Order/Order.jsx'
import OrderDetails from '../Customer/Components/Order/OrderDetails.jsx'
import MobileLoginForm from '../Customer/Auth/MobileLoginForm.jsx'
import MobileRegisterForm from '../Customer/Auth/MobileRegisterForm.jsx'
import CreateNewProduct from '../Customer/Components/Product/CreateNewProduct.jsx'
import UserProfile from '../Customer/Components/UserProfile/UserProfile.jsx'

const CustomerRoutes = () => {
    return (
        <div>
            <div>
                <Navigation />
            </div>
            <Routes>

                <Route path='/login' element={<HomePage />} />
                <Route path='/loginn' element={<MobileLoginForm />} />
                <Route path='/registerr' element={<MobileRegisterForm />} />
                <Route path='/register' element={<HomePage />} />

                <Route path='/' element={<HomePage />} />
                <Route path='/userProfile' element={<UserProfile/>} />
                <Route path='/addProduct' element = {<CreateNewProduct/>} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/:lavelOne/:lavelTwo/:lavelThree' element={<Product />} />
                <Route path='/Product/:productId' element={<ProductDetails />} />
                <Route path='/checkout' element={<CheckOut />} />
                <Route path='/account/order' element={<Order />} />
                <Route path='/account/order/:orderId' element={<OrderDetails />} />

            </Routes>

            <div>
                <Footer />
            </div>
        </div>
    )
}

export default CustomerRoutes