import React, { useState } from 'react';
import { auth, db } from '../../../utils/firebaseConfig';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from "react-router-dom";
import RoleSelectionModal from "../../SignUp/register";
import './login.css';
import SignUpForm from '../../SignUp/signUp';
import DoctorSignup from '../../SignUp/docSignUp';
import { showModal, hideModal } from '../../../core/AuthStore';
import { useDispatch, useSelector } from 'react-redux';
const AuthPage = () => {
    const dispatch = useDispatch();
    const { isModalOpen } = useSelector((state) => state.authStore);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('');
    const [specialty, setSpecialty] = useState('');
    const [description, setDescription] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);
    // const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            let userCredential;
            if (isRegistering) {
                if (!role) {
                    alert("Please select a role");
                    setLoading(false);
                    return;
                }

                userCredential = await createUserWithEmailAndPassword(auth, email, password);

                const userDocRef = doc(db, 'users', userCredential.user.uid);
                const userData = {
                    email,
                    role,
                    createdAt: serverTimestamp(),
                };

                if (role === 'doctor') {
                    userData.fullName = fullName;
                    userData.age = age;
                    userData.specialty = specialty;
                    userData.description = description || '';
                }

                await setDoc(userDocRef, userData);

                localStorage.setItem('user', JSON.stringify({ ...userData, uid: userCredential.user.uid }));

                alert("User registered successfully");
                navigate("/home");
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);

                const userDoc = await getDoc(doc(db, 'users', userCredential.user.uid));
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    localStorage.setItem('user', JSON.stringify({
                        email: email,
                        role: userData.role,

                        uid: userCredential.user.uid,
                    }));
                    navigate("/home");
                } else {
                    alert("No such user found in Firestore");
                }
            }

            const token = await userCredential.user.getIdToken();
            localStorage.setItem('token', token);

        } catch (error) {
            console.error("Error during authentication", error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    // const handleRoleSelection = (selectedRole) => {
    //     setRole(selectedRole);
    //     setShowModal(false);
    //     setIsRegistering(true); // Trigger registration form after role selection
    // };
    const handleRegistration = () => {
        dispatch(showModal())
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
        console.log(isModalOpen)
    }
    return (
        <div className="auth-page">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            {
                isModalOpen ? (
                    <RoleSelectionModal
                    />
                ) : (
                    <div className="auth-form-container">
                        {!isRegistering ? (
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
                                <button type="submit" disabled={loading}>
                                    {loading ? 'Processing...' : 'Login'}
                                </button>
                            </form>
                        ) : (
                            role === 'doctor' ? (
                                <DoctorSignup />
                            ) : (
                                role === 'patient' && <SignUpForm />
                            )
                        )}
                    </div>
                )
            }

            {
                !isRegistering && !isModalOpen && (
                    <p> Don’t have an account?{' '}
                        <a onClick={handleRegistration}>
                            Register
                        </a>
                    </p>
                )
            }
        </div >
    );
};

export default AuthPage;
