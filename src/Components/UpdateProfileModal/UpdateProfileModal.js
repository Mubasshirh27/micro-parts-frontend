import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';

const UpdateProfileModal = ({ setOpenModal, setPercentage }) => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();
    const [user] = useAuthState(auth)
    const onSubmit = data => {
        console.log(data)
        const url = `http://localhost:5000/updateProfile?email=${user?.email}`
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                toast('Profile Updated')
                console.log(data)
            })
        reset()
        setOpenModal(false)
        setPercentage(100)
    }
    return (
        <div>
            <input type="checkbox" id="my-profile" className="modal-toggle" />
            <div className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <label htmlFor="my-profile" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                    <h3 className='text-2xl font-bold mb-4'>Updating Profile</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input className='input input-bordered w-full max-w-xs ' type="text" required name="education" placeholder='Enter your latest qualification' id="" {...register("education")} />
                        <select name='city' required className="select select-primary w-full max-w-xs mt-4" {...register("city")} >
                            <option disabled selected>Choose your city</option>
                            <option>Rajshahi</option>
                            <option>Dhaka</option>
                            <option>Chittagong</option>
                            <option>Rongpur</option>
                        </select>
                        <input type="url" className='input input-bordered w-full max-w-xs mt-4' required name="linkedin" id="" placeholder='Enter your linkedin profile url' {...register("linkedin")} />
                        <br />
                        <button className='block mx-auto btn-success btn mt-4' type="submit">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateProfileModal;