import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "./CheckoutForm";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51LZ9txGXxgiiQIyCXWvoPoGN6xQYlEyiOj8l9cVnAy4omZR4e1SW8Xkor3OTOU9mZW6zms2BUaQ4fZmM7DwYZBAs00WE0k0iuN");

const Payment = () => {
    const [user] = useAuthState(auth)
    const { id } = useParams();
    console.log(id)
    const url = `http://localhost:5000/cart/${id}`;

    const { data: product, isLoading } = useQuery(['payment', id], () => fetch(url, {
        method: 'GET',
        headers: {
            'authorization': `Bearer ${localStorage.getItem('token')}`
        }
    }).then(res => res.json()));

    if (isLoading) {
        return
    }
    console.log(product);

    return (
        <>
            <div className="flex w-screen h-screen items-center justify-center">
                <img className="w-2/5 rounded-xl shadow-2xl" src={product?.img} alt="" />
                <div className=" bg-base-100 shadow-2xl rounded-xl">
                    <div className="card-body ">
                        <p className="text-black font-bold">Hello, {user?.displayName}</p>
                        <h2 className="card-title">Please Pay for {product?.price * product?.quantity}</h2>
                        <p>By filling up the card information you will be charged the money.</p>
                    </div>
                    <div className="card-body w-50 max-w-md">
                        <Elements stripe={stripePromise}>
                            <CheckoutForm product={product} />
                        </Elements>
                    </div>
                </div>
            </div>
            <div className="card  w-50 flex items-center justify-center shadow-2xl bg-base-100">
            </div>
        </>
    );
}
export default Payment;