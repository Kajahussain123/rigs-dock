import React from 'react'
import Header from '../Components/Header'
import MyOrdersPage from '../Components/MyOrders/OrdersPage'

function MyOrders() {
  return (
    <div>
        <Header></Header>
        <div><MyOrdersPage></MyOrdersPage></div>
    </div>
  )
}

export default MyOrders