import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify';

const PlaceOrder = () => {

    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setData(data => ({ ...data, [name]: value }))
    }

    const placeOrder = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item }; // Make a copy to avoid mutating state
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        // Decode userId from token
        let userId = "";
        if (token) {
            try {
                const decoded = jwtDecode(token);
                userId = decoded.id || decoded.userId || decoded._id; // Adjust based on your backend's token payload
            } catch (e) {
                console.error("Invalid token", e);
            }
        }

        let orderData = {
            userId,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        if (response.data.success) {
            const { session_url } = response.data;
            window.location.replace(session_url);
        } else {
            alert("Something went wrong!");
        }
    }

    const placeOrderUsingCOD = async (event) => {
        event.preventDefault();
        let orderItems = [];
        food_list.map((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item }; // Make a copy to avoid mutating state
                itemInfo["quantity"] = cartItems[item._id];
                orderItems.push(itemInfo);
            }
        });

        // Decode userId from token
        let userId = "";
        if (token) {
            try {
                const decoded = jwtDecode(token);
                userId = decoded.id || decoded.userId || decoded._id; // Adjust based on your backend's token payload
            } catch (e) {
                console.error("Invalid token", e);
            }
        }

        let orderData = {
            userId,
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });

        if (response.data.success) {
            toast.success("Order placed successfully!");
            navigate('/myorders');
        } else {
            alert("Something went wrong!");
        }
    }

    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            navigate('/cart');
        }
    }, [token])

    return (
        <form onSubmit={placeOrder} className='place-order'>
            <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className='multi-fields'>
                    <input required name='firstName' value={data.firstName} onChange={onChangeHandler} type="text" placeholder='First Name' />
                    <input required name='lastName' value={data.lastName} onChange={onChangeHandler} type="text" placeholder='Last Name' />
                </div>
                <input required name='email' value={data.email} onChange={onChangeHandler} type="email" placeholder='Email address' />
                <input required name='street' value={data.street} onChange={onChangeHandler} type="text" placeholder='Street' />
                <div className='multi-fields'>
                    <input required name='city' value={data.city} onChange={onChangeHandler} type="text" placeholder='City' />
                    <input required name='state' value={data.state} onChange={onChangeHandler} type="text" placeholder='State' />
                </div>
                <div className='multi-fields'>
                    <input required name='zipcode' value={data.zipcode} onChange={onChangeHandler} type="text" placeholder='Zip code' />
                    <input required name='country' value={data.country} onChange={onChangeHandler} type="text" placeholder='Country' />
                </div>
                <input required name='phone' value={data.phone} onChange={onChangeHandler} type="text" placeholder='Phone' />
            </div>
            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Total</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>

                    </div>
                    <button type='submit'>Proceed to Payment (Credit/Debit/UPI)</button>
                    <button type='button' onClick={placeOrderUsingCOD}>Cash on delivery</button>
                </div>
            </div>
        </form>
    )
}

export default PlaceOrder
