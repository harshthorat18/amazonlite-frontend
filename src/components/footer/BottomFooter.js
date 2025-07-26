import React from 'react';

const BottomFooter = () => {
  const today = new Date();
  const year = today.getFullYear();

  return (
    <div className='bottom-footer'>
      <div className='container'>
        <div className='row'>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/abebooks">
              <div className='title'>AbeBooks</div>
              <div className='desc'>Books, art<br />& collectibles</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/aws">
              <div className='title'>Amazon Web Services</div>
              <div className='desc'>Scalable Cloud<br />Computing Services</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/audible">
              <div className='title'>Audible</div>
              <div className='desc'>Download<br />Audio Books</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/dpreview">
              <div className='title'>DPReview</div>
              <div className='desc'>Digital<br />Photography</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/imdb">
              <div className='title'>IMDb</div>
              <div className='desc'>Movies, TV<br />& Celebrities</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/shopbop">
              <div className='title'>Shopbop</div>
              <div className='desc'>Designer<br />Fashion Brands</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/business">
              <div className='title'>Amazon Business</div>
              <div className='desc'>Everything For<br />Your Business</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/primenow">
              <div className='title'>Prime Now</div>
              <div className='desc'>2-Hour Delivery<br />on Everyday Items</div>
            </a>
          </div>
          <div className='col-xl-2 col-md-4 col-6'>
            <a href="/music">
              <div className='title'>Amazon Prime Music</div>
              <div className='desc'>90 million songs, ad-free<br />Over 15 million podcast episodes</div>
            </a>
          </div>
        </div>

        <div className='bottom-footer-bottom'>
          <a href="/terms">Conditions of Use & Sale</a>
          <a href="/privacy">Privacy Notice</a>
          <a href="/ads">Interest-Based Ads</a>
          <span>© 1996–{year}, AmazonLite.com or its affiliates</span>
        </div>
      </div>
    </div>
  );
};

export default BottomFooter;