import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';
import auth from '../../firebase.init';

const ShowProfile = () => {
    const [user, isloading] = useAuthState(auth)
    const [dbUser, setDbUser] = useState({})
    useEffect(() => {
        const url = `http://localhost:5000/user?email=${user?.email}`
        fetch(url, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
            .then(res => res.json())
            .then(data => setDbUser(data))

    }, [user])
    return (
        <div className='card shadow-2xl flex flex-col justify-center items-center pt-10 pb-10 mt-10'>
            <div className="avatar">
                <div className="w-24 mb-4 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={user?.photoURL} alt='' />
                </div>
            </div>
            <div className='text-left'>
                <p className='font-bold'>Name: {user?.displayName}</p>
                <p className='font-bold'> Email: {dbUser?.email}</p>
                {Object.keys(dbUser)?.length === 2 ? <p className='font-bold'>City: Not provided yet</p> : <p className='font-bold'>City: {dbUser?.city}</p>}
                {Object.keys(dbUser)?.length === 2 ? <p className='font-bold'>Education: Not provided yet</p> : <p className='font-bold'>Education: {dbUser?.education}</p>}
                {Object.keys(dbUser)?.length === 2 ? <p className='font-bold'>LinkedIn: Not provided yet</p> : <a className='font-bold text-blue-800' href={dbUser?.linkedInProfile}>Linkedin</a>}
            </div>
        </div>
    );
};

export default ShowProfile;