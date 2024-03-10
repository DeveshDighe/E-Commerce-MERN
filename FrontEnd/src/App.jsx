import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navigation from './Customer/Components/Navigation/Navigation.jsx'
import HomePage from './Customer/Pages/HomePage/HomePage'
import Footer from './Customer/Components/Footer/Footer.jsx'
import Product from './Customer/Components/Product/Product.jsx'
import { Route, Routes } from 'react-router-dom'
import ProductDetails from './Customer/Components/ProductDetails/ProductDetails.jsx'
import Cart from './Customer/Components/Cart/Cart.jsx'
import CheckOut from './Customer/Components/CheckOut/CheckOut.jsx'
import Order from './Customer/Components/Order/Order.jsx'
import OrderDetails from './Customer/Components/Order/OrderDetails.jsx'
import CustomerRoutes from './Routers/CustomerRoutes.jsx'

function App() {


  return (
    <>

    <Routes>
      <Route path='/*' element={<CustomerRoutes/>}></Route>
    </Routes>

    </>
  )
}

export default App
