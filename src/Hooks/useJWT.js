import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';

const useJWT = (user) => {
    const [token, setToken] = useState('')
    useEffect(() => {
        const email = user?.user?.email;
        const newUser = { "email": user?.email, "name": user?.name }
        if (email) {
            const url = `http://localhost:5000/user?email=${email}`
            fetch(url, {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(newUser)
            })
                .then(res => res.json())
                .then(data => {
                    const JWTtoken = data.token
                    setToken(JWTtoken)
                    localStorage.setItem('token', JWTtoken)
                })
        }
    }, [user])
    return token;
}

export default useJWT;
