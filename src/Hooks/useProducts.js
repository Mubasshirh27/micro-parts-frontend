import React from 'react';
import { QueryClient, useQuery } from 'react-query';
const useProducts = () => {
    const queryClient = new QueryClient()
    const { isLoading, error, data, refetch } = useQuery('repoData', () =>
        fetch('http://localhost:5000/products').then(res =>
            res.json()
        )
    )
    return { isLoading, error, data, refetch }
};

export default useProducts;