import React from 'react';
import './profile.css';

const OrderTop = ({ order }) => {
  if (!order || !order.date || !order.amount) return null;

  // Format date
  const [day, monthIndex, year] = order.date.split('/');
  const monthArr = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = monthArr[parseInt(monthIndex) - 1];
  const fullDate = `${day} ${month} ${year}`;

  // Format amount in Indian number system
  let amount = order.amount.toString();
  amount = amount.slice(0, -2); // remove paisa
  let lastThree = amount.slice(-3);
  let otherNumbers = amount.slice(0, -3);
  if (otherNumbers !== '') lastThree = ',' + lastThree;
  amount = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;

  return (
    <div>
      <div className='order-top row'>
        <div className='col-6 col-md-3 col-lg-2'>
          <h6 className='order-top-details'>Order Placed</h6>
          <p>{fullDate}</p>
        </div>
        <div className='col-6 col-md-3 col-lg-2'>
          <h6 className='order-top-details'>Total</h6>
          <p>₹{amount}.00</p>
        </div>
        <div className='col-12 col-md-6 col-lg-8'>
          <h6 className='order-id'>{order.razorpay?.orderId || "N/A"}</h6>
        </div>
      </div>
    </div>
  );
};

export default OrderTop;
