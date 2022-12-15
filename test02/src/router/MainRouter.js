import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import CartPage from '../pages/CartPage'

const MainRouter = () => {
  return (
    <div>
      <Routes>
        <Route path ="/"  element={<HomePage/>}  />
        <Route path ="*"  element={<HomePage/>}  />
        <Route path='/cart' element={<CartPage/>} />
      </Routes>
    </div>
  )
}

export default MainRouter
