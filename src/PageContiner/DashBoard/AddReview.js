import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user, isloading] = useAuthState(auth)
    const onSubmit = data => {
        const review = { 'name': user?.displayName, 'email': user?.email, 'review': data?.reviewText, 'star': data?.review, 'img': user?.photoURL }
        console.log(data);
        const url = `http://localhost:5000/review`
        fetch(url, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(review)
        })
            .then(res => res.json())
            .then(result => {
                toast.success('Review Added')
            })
        reset()
    }
    return (
        <div>
            <h3 className='font-bold text-2xl text-center text-black'>Add a review</h3>
            <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col items-center justify-center'>
                <div className="form-control w-full max-w-xs">
                    <label className="label">
                        <span className="label-text">Review</span>
                    </label>
                    <textarea className="textarea textarea-info" required placeholder="Write your detailed Review"
                        {...register("reviewText")}
                    ></textarea>
                </div>
                <input type="range" min="1" max="5" step="1" className='w-1/3' {...register("review")} required />
                <div className="w-1/3 flex justify-between text-xs px-2 cursor-pointer">
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                    <span>4</span>
                    <span>5</span>
                </div>
                <button className='btn btn-sm btn-success' type="submit">Submit</button>
            </form>
        </div>
    );
};

export default AddReview;