// Slider.jsx
import React from 'react';
import './home.css';
import Loader from '../loader/Loader';
import { NavLink } from 'react-router-dom';

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation } from 'swiper/modules';

const Slider = ({ title, link_text, arrFrom, arrTo, class: sliderClass, products, isLoading }) => {
  return (
    <div className='slider'>
      <div className='slider-heading'>
        <h5>{title}</h5>
        <NavLink to="#">{link_text}</NavLink>
      </div>

      {
        isLoading ? (
          <div className='slider' style={{ height: '332px' }}>
            <Loader />
          </div>
        ) : (
          <Swiper
            slidesPerView='auto'
            spaceBetween={10}
            slidesPerGroupAuto={true}
            navigation={true}
            modules={[Pagination, Navigation]}
            className={sliderClass}
          >
            {
              Array.isArray(products) &&
              products.slice(arrFrom, arrTo).map((product) => (
                <SwiperSlide className='swiper-slide' key={product._id || product.id}>
                  <NavLink to={`/product/${product._id}`}>
                    <div className='swiper-slide-img-wrapper'>
                      <img
                        src={`/${(product.resUrl || product.url).replace(/^\/+/, '')}`}
                        className="swiper-slide-img"
                        alt={product.name || "Product Image"}
                        onError={(e) => {
                          e.target.src = "/images/products/placeholder.jpg";
                        }}
                      />
                    </div>
                    <p className='swiper-slide-price'>₹{product.value || product.price}</p>
                  </NavLink>
                </SwiperSlide>
              ))
            }
          </Swiper>
        )
      }
    </div>
  );
};

export default Slider;
