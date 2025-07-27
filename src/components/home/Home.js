import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import CategoryCards from './CategoryCards';
import Slider from './Slider';
import './home.css';
import axios from 'axios';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getProducts = async () => {
    try {
      const res = await axios.get('https://amazonlite-backend.onrender.com/api/products');
      setProducts(res.data);
      setIsLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className='home'>
      <Banner />
      <main>
        <Slider
          title="Today's Deals"
          link_text="See all deals"
          arrFrom={0}
          arrTo={13}
          class="todaysDeals"
          products={products}
          isLoading={isLoading}
        />
        <Slider
          title="Up to 60% off on home products | Small businesses"
          link_text="See all offers"
          arrFrom={13}
          arrTo={22}
          class="SmallBusinesses"
          products={products}
          isLoading={isLoading}
        />
        <CategoryCards />
      </main>
    </div>
  );
};

export default Home;
