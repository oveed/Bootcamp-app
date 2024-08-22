import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../utils/firebaseConfig'; // Add Firestore db import
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Firestore methods
import { onAuthStateChanged, getIdToken } from 'firebase/auth';
import { UserData } from '../../../utils/userData';
import { useNavigate } from "react-router-dom";
import './login.css';

const AuthPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let userCredential;
            if (isRegistering) {
                if (!role) {
                    alert("Please select a role: Patient or Doctor");
                    return;
                }

                // Register the user
                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                // Store user data in Firestore
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    email: email,
                    role: role,
                });
                localStorage.setItem('user', JSON.stringify({
                    email: email,
                    role: role,
                    uid: userCredential.user.uid,
                }));
                alert("User registered successfully");
                navigate("/");
            } else {
                // Login the user
                userCredential = await signInWithEmailAndPassword(auth, email, password);

                // Retrieve user role from Firestore
                const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    alert(`User logged in successfully as ${userData.role}`);
                    // Save user data to localStorage
                    localStorage.setItem('user', JSON.stringify({
                        email: email,
                        role: userData.role,
                        uid: userCredential.user.uid,
                    }));
                    navigate("/");
                } else {
                    alert("No such user found in Firestore");
                }
            }

            // Retrieve the ID token and save it in localStorage
            const token = await getIdToken(userCredential.user);
            localStorage.setItem('token', token);

        } catch (error) {
            console.error("Error during authentication", error);
            alert(error.message);
        }
    };

    return (
        <div className="auth-page">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {isRegistering && (
                    <div>
                        <label>Role</label>
                        <div>
                            <label>
                                <input
                                    type="radio"
                                    value="patient"
                                    checked={role === 'patient'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Patient
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    value="doctor"
                                    checked={role === 'doctor'}
                                    onChange={(e) => setRole(e.target.value)}
                                />
                                Doctor
                            </label>
                        </div>
                    </div>
                )}
                <button type="submit">
                    {isRegistering ? 'Register' : 'Login'}
                </button>
            </form>
            <button type="button" onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
            </button>
        </div>
    );
};

export default AuthPage;
