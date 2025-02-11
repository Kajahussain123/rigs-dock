import React from 'react'
import Header from '../Components/Header'
import EcommerceBanner from '../Components/Home/Banner'
import CategoryNav from '../Components/Home/Category'
import DealsSlider from '../Components/Home/DealsCarousal'
import NewArrivals from '../Components/Home/NewArrivals'
import OurProducts from '../Components/Home/OurProducts'
import DealOfTheDay from '../Components/Home/DealOfTheDay'

function Home() {
  return (
    <div>
        <Header></Header>
        <div><EcommerceBanner></EcommerceBanner></div>
        <div><CategoryNav></CategoryNav></div>
        <div><DealsSlider></DealsSlider></div>
        <div><NewArrivals></NewArrivals></div>
        <div><OurProducts></OurProducts></div>
        <div><DealOfTheDay></DealOfTheDay></div>
    </div>
  )
}

export default Home