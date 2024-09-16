import React from 'react'
import Layout from '../../componts/layout/Layout'
import HeroSection from '../../componts/heroSection/HeroSection'
import Filter from '../../componts/filter/Filter'
import ProductCard from '../../componts/productCard/ProductCard'
import Track from '../../componts/track/Track'
import Testimonial from '../../componts/testimonial/Testimonial'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
const Home = () => {
 
 
  return (
  
    <Layout>
      
      <HeroSection />
      <Filter />
      <ProductCard />
      <Track />
      <div className="flex justify-center -mt-10 mb-4">
        <Link to={'/allproducts'}>
          <button className=' bg-gray-300 px-5 py-2 rounded-xl'>See more</button>
        </Link>
      </div>
      <Testimonial />
    </Layout>
  )
}

export default Home
