import React, { useState, useEffect } from 'react';

function Home() {
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
            {/* Form for user login */}
        </div>

    );
}
export default Home