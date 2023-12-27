// LoginPopup.tsx
import React from "react";

interface LoginPopupProps {
  onClose: () => void;
}

/**
 * 
 * @param param0 
 * @returns 
 */
const LoginPopup: React.FC<LoginPopupProps> = ({ onClose }) => {
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="popup" onClick={onClose}>
      <div className="popup-content" onClick={stopPropagation}>
        <h2 className="popup-title">Login</h2>
        <div className="container">
          <form className="login-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your username/name"
                name="name"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your Email"
                name="email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="password"
                name="password"
                required
              />
            </div>

            <button className="btn btn--form" type="submit" value="Log in">
              Log in
            </button>
          </form>
        </div>
        <button className="close-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default LoginPopup;
