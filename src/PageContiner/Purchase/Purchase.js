import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import auth from '../../firebase.init';
import ShowProfile from '../DashBoard/ShowProfile';
import './Purchase.css'
const Purchase = () => {
    const { id } = useParams()
    const [user] = useAuthState(auth)
    console.log(user?.email)
    // data fetching
    const { isLoading, error, data, refetch } = useQuery(['product', id], () =>
        fetch(`http://localhost:5000/product/${id}`).then(res =>
            res.json()
        )
    )
    // Updating Quantity

    // error message
    const [errorMessage, seterrorMessage] = useState('')
    if (isLoading) {
        return
    }
    console.log(data)
    // handleProduct Quantity

    const handleProductQuantity = (e) => {
        console.log(e.target.value)
        if (e.target.value > data.stock) {
            seterrorMessage('Product quantity should be less than stock ')
        }
        else if (e.target.value < 1000) {
            seterrorMessage('Product quantity can not be less than minimum quantity ')
        } else if (e.target.value <= data.stock & e.target.value < data.stock) {
            seterrorMessage('')
        }

    }
    //HandleSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        if (errorMessage) {
            return
        }
        const orderedQuantity = e.target[0].value
        const newStock = data?.stock - orderedQuantity
        const url = `http://localhost:5000/products/${id}`
        const updatedProduct = { ...data, 'stock': newStock }
        console.log(updatedProduct)
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(updatedProduct)
        })
            .then(res => res.json())
            .then(data => {
                refetch()
                console.log(data)
            })
        toast.success('Product Added to cart')
        // Adding to cart
        const product = { name: data.name, img: data.img, description: data.description, quantity: orderedQuantity, paidStaus: 'unpaid', price: data.price, email: user?.email }
        fetch('http://localhost:5000/cart', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(result => console.log(result))
        e.target[0].value = ''
    };
    return (
        <div>
            <Navbar></Navbar>
            <ShowProfile></ShowProfile>
            <div className="product flex flex-col md:flex-row my-10 mx-auto">
                <img src={data?.img} alt="" />
                <div className="product-info">
                    <h3 className='text-2xl font-bold'>{data?.name}</h3>
                    <p>{data?.description}</p>
                    <small>{data?.seller}</small>
                    <small className='text-orange-500 block'><strong>Minimum Quantity 1000 pices</strong></small>
                    <small className='block'>inStock :{data?.stock} pieces</small>
                    <form onSubmit={handleSubmit}>
                        <input onChange={handleProductQuantity} className='input input-bordered w-full max-w-xs' placeholder='Please enter the product quantity' type="number" name="" id="" required />
                        <br />
                        {errorMessage ? <small className='text-red-600'>{errorMessage}</small> : null}
                        <br />
                        <button type="submit">Add to cart</button>
                    </form>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Purchase;