import React, { useState } from 'react';
import { toast } from 'react-toastify';

const UserTable = ({ elem, refetch, index }) => {
    const makeAdmin = (email) => {
        const url = `http://localhost:5000/users?email=${email}`
        fetch(url, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ role: 'admin' })
        })
            .then(res => res.json())
            .then(data => {
                toast('Status Updated')
                refetch()
            })
    }
    return (
        <tr>
            <td>
                <div className="flex items-center space-x-3">
                    <div>
                        <div className="font-bold">{index + 1}</div>
                    </div>
                </div>
            </td>
            <td>
                {elem?.email}
            </td>
            <td>{!elem?.role ? <p>Buyer</p> : elem?.role}</td>
            <td>
                {
                    elem?.role !== 'admin' ? <button className='btn btn-sm btn-info' onClick={() => makeAdmin(elem?.email)}>Make Admin</button> : null
                }
            </td>
        </tr>
    );
};

export default UserTable;