import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import UpdateProfileModal from '../../Components/UpdateProfileModal/UpdateProfileModal';
import ShowProfile from './ShowProfile';
const MyProfile = () => {
    const [user, isloading] = useAuthState(auth)
    const [openModal, setOpenModal] = useState(false)
    const [percentage, setPercentage] = useState(30)
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
    console.log(Object.keys(dbUser)?.length)

    return (
        <div>
            <h2 className='text-2xl text-center text-black font-bold'>{user?.displayName} Profile</h2>
            {
                Object.keys(dbUser)?.length === 2 ? <div className='w-20'>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        styles={
                            buildStyles({
                                textSize: "14px"
                            })}
                    />
                </div> : <div className='w-20'>
                    <CircularProgressbar
                        value={100}
                        text={`${100}%`}
                        styles={
                            buildStyles({
                                textSize: "14px"
                            })}
                    />
                </div>
            }
            {
                openModal ? <UpdateProfileModal setOpenModal={setOpenModal} setPercentage={setPercentage}></UpdateProfileModal> : null
            }
            <ShowProfile></ShowProfile>
            {Object.keys(dbUser)?.length === 2 ? <div className='text-center'>
                <label htmlFor="my-profile" onClick={() => setOpenModal(true)} className="btn modal-button">Update Profile</label>
            </div> : null}

        </div>
    );
};

export default MyProfile;