import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../../utils/firebaseConfig';
import { UserData } from '../../../../utils/userData';
import { useNavigate } from "react-router-dom";
import "../../Profile.css"
const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const userData = UserData();
            if (userData && userData.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', userData.uid));
                    if (userDoc.exists()) {
                        setUser(userDoc.data());
                    } else {
                        console.error("No such user document found!");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            } else {
                navigate('/login');
            }
            setLoading(false);
        };

        fetchUserData();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <div>No user data available</div>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-header">User Profile</h2>
                <div className="profile-item">
                    <strong>Email:</strong> {user.email}
                </div>
                <div className="profile-item">
                    <strong>Role:</strong> {user.role}
                </div>
                <button onClick={() => navigate('/')}>
                    Go to Dashboard
                </button>
            </div>
        </div>
    );
};


export default ProfilePage;
