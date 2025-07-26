import React, { useEffect, useState } from 'react';
import Loader from '../loader/Loader';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Alert from '@mui/material/Alert';
import './cart.css';
import CartProduct from './CartProduct';
import SubTotal from './SubTotal';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [cartArr, setCartArr] = useState([]);
  const [userData, setUserData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/getAuthUser`, { withCredentials: true })
      .then(function (res) {
        setUserData(res.data);
        setCartArr(res.data.cart);
        setIsLoading(false);
      })
      .catch(function (error) {
        if (error.response?.data?.message === "No token provided") {
          navigate('/login');
        } else {
          console.log(error);
        }
      });
  }, []);

  // Prepare ordered products array
  const orderedProducts = cartArr.map(item => ({
    id: item.cartItem.id,
    name: item.cartItem.name,
    qty: item.qty,
    img: item.cartItem.url
  }));

  // Calculate total order amount
  const orderAmount = cartArr.reduce((sum, item) => sum + item.qty * item.cartItem.accValue, 0);

  function loadRazorpay() {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";

    script.onerror = () => {
      alert("Razorpay SDK failed to load. Try again later.");
    };

    script.onload = async () => {
      try {
        const res = await axios.post(`http://localhost:5000/api/create-order`, {
          amount: orderAmount + '00'
        }, {
          withCredentials: true
        });

        const { id, amount, currency } = res.data.order;
        const { data: keyData } = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/get-razorpay-key`);
        const key = keyData.key;

        const today = new Date();
        const date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();

        const options = {
          key,
          amount: amount.toString(),
          currency,
          order_id: id,
          name: "AmazonLite",
          handler: async function (response) {
            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/pay-order`, {
              orderedProducts,
              dateOrdered: date,
              amount,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              razorpaySignature: response.razorpay_signature
            }, {
              withCredentials: true
            });
            navigate("/orders");
          },
          prefill: {
            name: userData.name,
            email: userData.email,
            contact: '+91' + userData.number
          },
          theme: {
            color: '#1976D2'
          }
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();

      } catch (error) {
        console.log("Payment error:", error);
      }
    };

    document.body.appendChild(script);
  }

  // Format amount with commas
  const formatAmount = (amount) => {
    let amtStr = amount.toString();
    let lastThree = amtStr.substring(amtStr.length - 3);
    let otherNumbers = amtStr.substring(0, amtStr.length - 3);
    if (otherNumbers !== '') lastThree = ',' + lastThree;
    return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
  };

  if (cartArr.length > 0) {
    const totalQty = cartArr.reduce((sum, item) => sum + item.qty, 0);
    const amountFormatted = formatAmount(orderAmount);

    return (
      <>
        {isLoading ? <Loader /> :
          <div className='cart-section'>
            <div className='left'>
              <h3>Shopping Cart</h3>
              <p className='price-heading'>Price</p>
              {
                cartArr.map((cart, index) => (
                  <CartProduct key={index} cartItem={cart.cartItem} qty={cart.qty} />
                ))
              }
              <SubTotal totalQty={totalQty} subTotal={amountFormatted} />
            </div>
            <div className="right">
              <SubTotal totalQty={totalQty} subTotal={amountFormatted} />
              <button onClick={loadRazorpay}>Proceed to Buy</button>
            </div>
          </div>
        }
      </>
    );
  } else {
    return (
      <>
        {
          isLoading ? <Loader /> :
            <Alert
              variant="outlined"
              severity="warning"
              style={{
                width: '80%',
                margin: '30px auto',
                fontSize: '16px',
                display: 'flex',
                justifyContent: 'center'
              }}>
              Cart is empty
            </Alert>
        }
      </>
    );
  }
};

export default Cart;
