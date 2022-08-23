import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init'
import Table from '../../Components/Table/Table';
const MyOrder = () => {
    const [user, loading] = useAuthState(auth)
    // Load carted product
    const { isLoading, error, data, refetch } = useQuery(['cartedData', user?.email], () =>
        fetch(`http://localhost:5000/cartedItem?email=${user?.email}`).then(res =>
            res.json()
        )
    )
    if (isLoading || loading) {
        return
    }
    console.log(data)
    return (
        <div>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map(elem => <Table
                            key={elem._id}
                            refetch={refetch}
                            elem={elem}
                        ></Table>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MyOrder;