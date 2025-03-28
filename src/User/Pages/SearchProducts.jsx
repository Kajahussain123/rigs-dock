import React from 'react'
import Header from '../Components/Header'
import SearchResultsPage from '../Components/Search/SearchPage'

function SearchProducts() {
  return (
    <div>
        <Header></Header>
        <div><SearchResultsPage></SearchResultsPage></div>
    </div>
  )
}

export default SearchProducts