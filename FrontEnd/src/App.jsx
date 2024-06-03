
import './App.css'
import { Route, Routes } from 'react-router-dom'
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
