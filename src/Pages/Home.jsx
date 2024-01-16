import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Banner from '../Components/Banner'
import Categories from '../Components/Categories'
import Footer from '../Components/Footer'

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="mx-auto"> 
    <Navbar handleCategoryClick={handleCategoryClick}/>
    <Banner />
    <Categories handleCategoryClick={handleCategoryClick} selectedCategory={selectedCategory}/>
    <Footer />
  </div>
  )
}

export default Home
