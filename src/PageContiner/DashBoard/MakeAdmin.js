import React from 'react';
import { QueryClient, useQuery } from 'react-query';
import UserTable from '../../Components/userTable/UserTable';

const MakeAdmin = () => {
    const queryClient = new QueryClient()
    const { isLoading, error, data, refetch } = useQuery('alluser', () =>
        fetch('http://localhost:5000/alluser').then(res =>
            res.json()
        )
    )
    if (isLoading) {
        return
    }
    return (
        <div className='overflow-x-auto w-full'>
            <table className="table w-full">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((elem, index) => <UserTable key={elem._id} index={index} refetch={refetch} elem={elem}></UserTable>)
                    }
                </tbody>
            </table>
        </div>
    );
};

export default MakeAdmin;