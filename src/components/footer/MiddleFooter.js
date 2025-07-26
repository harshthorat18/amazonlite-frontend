import React, { useState } from 'react';
import LanguageIcon from '@mui/icons-material/Language';
import logo from './logo.png';

const MiddleFooter = () => {
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  const toggleLanguages = () => {
    setShowLangDropdown(!showLangDropdown);
  };

  return (
    <div className='middle-footer'>

      {/* TOP SECTION */}
      <div className='middle-footer-top'>
        <div className='row'>
          <div className='col-6 col-xl-3'>
            <h6>Get to Know Us</h6>
            <p><a href="/about">About Us</a></p>
            <p><a href="/careers">Careers</a></p>
            <p><a href="/press">Press Releases</a></p>
            <p><a href="/cares">Amazon Cares</a></p>
            <p><a href="/gift">Gift a Smile</a></p>
            <p><a href="/science">Amazon Science</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Connect with Us</h6>
            <p><a href="/#">Facebook</a></p>
            <p><a href="/#">Twitter</a></p>
            <p><a href="/#">Instagram</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Make Money with Us</h6>
            <p><a href="/#">Sell on Amazon</a></p>
            <p><a href="/#">Sell under Amazon Accelerator</a></p>
            <p><a href="/#">Amazon Global Selling</a></p>
            <p><a href="/#">Become an Affiliate</a></p>
            <p><a href="/#">Fulfilment by Amazon</a></p>
            <p><a href="/#">Advertise Your Products</a></p>
            <p><a href="/#">Amazon Pay on Merchants</a></p>
          </div>
          <div className='col-6 col-xl-3'>
            <h6>Let Us Help You</h6>
            <p><a href="/#">COVID-19 and Amazon</a></p>
            <p><a href="/#">Your Account</a></p>
            <p><a href="/#">Returns Centre</a></p>
            <p><a href="/#">100% Purchase Protection</a></p>
            <p><a href="/#">Amazon App Download</a></p>
            <p><a href="/#">Amazon Assistant Download</a></p>
            <p><a href="/#">Help</a></p>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION */}
      <div className='middle-footer-bottom'>
        <div className='logo-language'>
          <div className='footer-logo'>
            <a href="/">
              <img src={logo} alt="AmazonLite Logo" />
            </a>
          </div>

          <div className='language-dropdown'>
            <button onClick={toggleLanguages}>
              <LanguageIcon />
              English
            </button>
            {showLangDropdown && (
              <div className="language-dropdown-content">
                <div className='lang-name'>
                  <input type='radio' name='language' id="english" value='EN' defaultChecked />
                  <label htmlFor="english">English - EN</label>
                </div>
                <div className='dropdown-divider'></div>
                <div className='lang-name'>
                  <input type='radio' name='language' id='hindi' value='HI' />
                  <label htmlFor="hindi">हिन्दी - HI</label>
                </div>
                <div className='lang-name'>
                  <input type='radio' name='language' id='tamil' value='TA' />
                  <label htmlFor="tamil">தமிழ் - TA</label>
                </div>
                <div className='lang-name'>
                  <input type='radio' name='language' id='kannada' value='KN' />
                  <label htmlFor="kannada">ಕನ್ನಡ - KN</label>
                </div>
                <div className='lang-name'>
                  <input type='radio' name='language' id='bengali' value='BN' />
                  <label htmlFor="bengali">বাংলা - BN</label>
                </div>
                <div className='lang-name'>
                  <input type='radio' name='language' id='marathi' value='MR' />
                  <label htmlFor="marathi">मराठी - MR</label>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className='countries'>
          <a href="/#">Australia</a>
          <a href="/#">Brazil</a>
          <a href="/#">Canada</a>
          <a href="/#">China</a>
          <a href="/#">France</a>
          <a href="/#">Germany</a>
          <a href="/#">Italy</a>
          <a href="/#">Japan</a>
          <a href="/#">Mexico</a>
          <a href="/#">Netherlands</a>
          <a href="/#">Poland</a>
          <a href="/#">Singapore</a>
          <a href="/#">Spain</a>
          <a href="/#">Turkey</a>
          <a href="/#">United Arab Emirates</a>
          <a href="/#">United Kingdom</a>
          <a href="/#">United States</a>
        </div>
      </div>
    </div>
  );
};

export default MiddleFooter;
