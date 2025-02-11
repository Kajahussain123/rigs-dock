import React from 'react'
import Header from '../Components/Header'
import SingleProductView from '../Components/ProductView/SingleView'
import SimilarProducts from '../Components/ProductView/SimilarProducts'

function ProductView() {
  return (
    <div>
        <Header></Header>
        <div><SingleProductView></SingleProductView></div>
        <div><SimilarProducts></SimilarProducts></div>
    </div>
  )
}

export default ProductView