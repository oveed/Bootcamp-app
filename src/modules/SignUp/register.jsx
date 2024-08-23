import React from 'react';
import './register.css';

const RoleSelectionModal = ({ onClose, onSelectRole }) => {
    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Select Your Role</h3>
                <div className="role-buttons">
                    <button onClick={() => onSelectRole('doctor')}>Doctor</button>
                    <button onClick={() => onSelectRole('patient')}>Patient</button>
                </div>
                <button className="go-back" onClick={onClose}>Go Back</button>
            </div>
        </div>
    );
};

export default RoleSelectionModal;
