import React from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div className="px-20"> 
    <Navbar />
    <Banner />
    <Categories />
    <Footer />
  </div>
  )
}

export default Home
