import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddProduct = () => {
    const imageStorageKey = 'cca1d66af8e3457cde08c945e171cf8a'
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const onSubmit = (data) => {
        const image = data.img[0];
        const formData = new FormData();
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(result => {
                console.log(result);
                if (result.success) {
                    const img = result.data.url;
                    const product = {
                        name: data?.name,
                        description: data?.description,
                        price: data?.price,
                        img: img,
                        stock: data?.stock
                    }
                    console.log(product);
                    fetch(`http://localhost:5000/addproduct`, {
                        method: 'POST',
                        headers: {
                            "content-type": 'application/json',
                        },
                        body: JSON.stringify(product)
                    })
                        .then(res => res.json())
                        .then(data => {
                            toast('Product Added')
                            reset()
                        })
                }
            })
    }
    return (
        <div className='flex  h-screen justify-center md:mt-10'>
            <div className='form-control w-full max-w-xs'>
                <p className='font-bold mx-auto'>Add product here</p>
                <form className='border-2 p-8 shadow-xl rounded-2xl' onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className='input input-bordered w-full max-w-xs mt-4' name="productName" id="" placeholder='Esnter the product name here' {...register("name")} required />
                    <textarea className="textarea input-bordered w-full max-w-xs textarea-info mt-4" placeholder="Write the product description here" {...register("description")} required></textarea>
                    <input className='input input-bordered w-full max-w-xs mt-4 p-2 ' type="file" name="img" id="" {...register("img")} />
                    <input className='input input-bordered w-full max-w-xs mt-4' type="number" name="stock" id="" placeholder='Enter the stock Quantity' {...register("stock")} required />
                    <input className='input input-bordered w-full max-w-xs mt-4' type="number" name="price" id="" placeholder='Enter the Price here' {...register("price")} required />
                    <button className='btn btn-success btn-sm mx-auto block mt-4' type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;