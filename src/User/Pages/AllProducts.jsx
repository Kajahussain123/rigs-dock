import React from 'react'
import Header from '../Components/Header'
import AllProductsPage from '../Components/AllProducts/Page'
import FilterSection from '../Components/AllProducts/Filter'


function AllProducts() {
  return (
    <div><Header></Header>
    {/* <FilterSection></FilterSection> */}
    <div><AllProductsPage></AllProductsPage></div>
    </div>
  )
}

export default AllProducts