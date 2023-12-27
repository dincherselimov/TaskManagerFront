import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SignUpPopupProps {
  onClose: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
const SignUpPopup: React.FC<SignUpPopupProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: Add signup logic, e.g., make API call to register the user

    // Close the popup after signup
    onClose();
  };

  return (
    <div className="popup">
      <div className="popup-content">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
              <label htmlFor="name">Username</label>
              <input
                id="name"
                value={formData.username}
                type="text"
                placeholder="Enter your username/name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
          <div className="form-group">
              <label htmlFor="name">Email</label>
              <input
                id="name"
                value={formData.email}
                type="text"
                placeholder="Enter your username/name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
          
            <div className="form-group">
              <label htmlFor="name">Password</label>
              <input
                id="name"
                value={formData.password}
                type="text"
                placeholder="Enter your username/name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="name">Confirm Password</label>
              <input
                id="name"
                value={formData.confirmPassword}
                type="text"
                placeholder="Enter your username/name"
                name="name"
                onChange={handleChange}
                required
              />
            </div>
          <button className="btn btn--form" type="submit" value="Log in">Log in</button>
        </form>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SignUpPopup;


