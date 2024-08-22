import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/profile")
    }
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
            const userData = JSON.parse(storedUser);
            console.log("User is already logged in:", userData.email);
            console.log("User role:", userData.role);
        } else {
            console.log("No user logged in");
        }
    }, []);
    return (
        <div>
            <h1>Hello</h1>
            <button onClick={handleClick}>Profile</button>
        </div>

    );
}
export default Home