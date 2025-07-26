import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './product.css';
import { useParams, useNavigate } from 'react-router-dom';
import Loader from '../loader/Loader';

const Product = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [product, setProduct] = useState(null);
    const [userData, setUserData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    // Base URL for your backend API.
    // Ensure this matches your backend server's address (e.g., http://localhost:5000)
    // The /api prefix will be added to individual endpoints.
    const BASE_BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    // ✅ Get Authenticated User Details
    const getUserDetails = async () => {
        try {
            // Corrected URL: BASE_BACKEND_URL + /api/getAuthUser
            const res = await axios.get(`${BASE_BACKEND_URL}/api/getAuthUser`, { withCredentials: true });
            setUserData(res.data);
        } catch (error) {
            console.error("Failed to fetch user", error);
            // Optionally, if auth fails, you might want to redirect to login
            if (error.response && error.response.status === 401) {
                // navigate('/login'); // Uncomment if you want to redirect on auth failure
            }
        }
    };

    // ✅ Fetch Product
    const fetchSingleProduct = async () => {
        try {
            // Corrected URL: BASE_BACKEND_URL + /api/products/:id
            const res = await axios.get(`${BASE_BACKEND_URL}/api/products/${id}`);
            setProduct(res.data);
        } catch (error) {
            console.error('Product fetch error:', error);
            // Handle 404 specifically if product not found
            if (error.response && error.response.status === 404) {
                setProduct(null); // Explicitly set to null to show "Product Not Found"
            }
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        // Ensure id is available before fetching product
        if (id) {
            fetchSingleProduct();
        }
        getUserDetails(); // Fetch user details regardless of product ID
    }, [id]); // Dependency array includes 'id' to re-run when product ID changes

    // ✅ Add to cart
    const addToCart = async (productId) => {
        if (!productId) {
            alert("Invalid product. Cannot add to cart.");
            return;
        }
        try {
            // Corrected URL: BASE_BACKEND_URL + /api/addtocart/:productId
            await axios.post(`${BASE_BACKEND_URL}/api/addtocart/${productId}`, { product }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });
            alert("Added to cart successfully!");
        } catch (error) {
            if (error.response?.data?.message === "No token provided") {
                navigate('/login');
            } else {
                console.error("Add to cart error:", error);
                alert("Failed to add to cart.");
            }
        }
    };

    // ✅ Razorpay payment
    const loadRazorpay = () => {
        if (window.Razorpay) {
            return openRazorpay();
        }

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";

        script.onerror = () => alert("Razorpay SDK failed to load. Try again later");

        script.onload = openRazorpay;

        document.body.appendChild(script);
    };

    const openRazorpay = async () => {
        try {
            if (!product || !product.accValue || isNaN(product.accValue)) {
                alert("Invalid product value.");
                return;
            }

            const orderAmount = Number(product.accValue) * 100;

            // Corrected URL: BASE_BACKEND_URL + /api/create-order
            const res = await axios.post(`${BASE_BACKEND_URL}/api/create-order`, {
                amount: orderAmount
            }, { withCredentials: true });

            const { id: order_id, amount, currency } = res.data.order;

            // Corrected URL: BASE_BACKEND_URL + /api/get-razorpay-key
            const keyRes = await axios.get(`${BASE_BACKEND_URL}/api/get-razorpay-key`);
            const key = keyRes.data.key;

            const options = {
                key,
                amount: amount.toString(),
                currency,
                order_id,
                name: product.name,
                description: "AmazonLite Payment",
                handler: async function (response) {
                    try {
                        // Corrected URL: BASE_BACKEND_URL + /api/pay-order
                        await axios.post(`${BASE_BACKEND_URL}/api/pay-order`, {
                            orderedProducts: {
                                id: product._id,
                                name: product.name,
                                qty: 1,
                                img: product.url || product.resUrl
                            },
                            amount,
                            razorpayPaymentId: response.razorpay_payment_id,
                            razorpayOrderId: response.razorpay_order_id,
                            razorpaySignature: response.razorpay_signature
                        }, { withCredentials: true });

                        alert("Payment successful!");
                        navigate("/orders");

                    } catch (err) {
                        console.error("Payment confirmation failed:", err);
                        alert("Error in payment confirmation. Please try again.");
                    }
                },
                prefill: {
                    name: userData?.name || "Guest",
                    email: userData?.email || "guest@example.com",
                    contact: userData?.number ? '+91' + userData.number : ''
                },
                theme: {
                    color: "#1976D2"
                }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Razorpay error:", error.response?.data || error);
            alert("Error in payment. Please try again.");
        }
    };

    // ✅ Estimated Delivery Date
    const today = new Date();
    today.setDate(today.getDate() + 3);
    const deliveryDate = `${today.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}`;

    if (isLoading) return <Loader />;

    if (!product) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h2>Product Not Found</h2>
                <p>It seems this product doesn't exist or was removed.</p>
            </div>
        );
    }

    return (
        <div className='product-section'>
            <div className='left'>
                <img
                    src={product.resUrl || product.url}
                    alt={product.name}
                    onError={(e) => { e.target.src = "/default-product.png"; }}
                />
            </div>
            <div className='middle'>
                <div className='product-details'>
                    <h4>{product.name}</h4>
                    <div className='divider'></div>
                    <div className='price'>
                        {product.discount}
                        <span>
                            <span className='sup'> ₹</span>
                            {product.value}
                            <span className='sup'>00</span>
                        </span>
                    </div>
                    <div className='mrp'>M.R.P.: <strike>{product.mrp}</strike></div>
                    <p className='taxes'>Inclusive of all taxes</p>
                </div>
                <div className='about-product'>
                    <h6>About this item</h6>
                    <ul>
                        {(product.points?.length > 0) ? (
                            product.points.map((point, index) => (
                                <li key={index}>{point}</li>
                            ))
                        ) : (
                            <li>No description available.</li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='right'>
                <h3>
                    <span><span className='sup'>₹</span>{product.value}<span className='sup'>00</span></span>
                </h3>
                <p><span>FREE delivery:</span> {deliveryDate}</p>
                <button id="addtocart-btn" onClick={() => addToCart(product._id)} disabled={!product._id}>
                    Add to Cart
                </button>
                <button onClick={loadRazorpay} disabled={!userData || !product}>
                    Buy Now
                </button>
            </div>
        </div>
    );
};

export default Product;
