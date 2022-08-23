import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import ManageOrderTable from '../../Components/ManageProductTable/ManageOrderTable'

const ManageOrders = () => {
    const queryClient = new QueryClient()
    const { isLoading, error, data, refetch } = useQuery('allcartedItem', () =>
        fetch('http://localhost:5000/allcartedproduct').then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return
    }
    return (
        <div>
            <div className='overflow-x-auto w-full'>
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Buyer Info</th>
                            <th>Price & Quantity</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data?.map(elem => <ManageOrderTable key={elem._id} refetch={refetch} elem={elem}></ManageOrderTable>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageOrders;