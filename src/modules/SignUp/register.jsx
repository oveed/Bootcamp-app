import React from 'react';
import './register.css';
import { useDispatch, useSelector } from 'react-redux';
import { hideModal, setRole } from '../../core/AuthStore';
import { useNavigate } from 'react-router-dom';

const RoleSelectionModal = () => {
    const { isModalOpen } = useSelector((state) => state.authStore);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleRoleSelection = (role) => {
        dispatch(setRole(role));
        dispatch(hideModal());
        navigate('/signup');
    };
    const onClose = () => {
        dispatch(hideModal())
        console.log(isModalOpen)
    }
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Select Your Role</h3>
                <div className="role-buttons">
                    <button onClick={() => handleRoleSelection('doctor')}>Doctor</button>
                    <button onClick={() => handleRoleSelection('patient')}>Patient</button>
                </div>
                <button className="go-back" onClick={onClose}>Go Back</button>
            </div>
        </div>
    );
};

export default RoleSelectionModal;
