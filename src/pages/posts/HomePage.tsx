import React, { useState } from "react";
import LoginPopup from "../components/LoginPopup";
import SignUpPopup from "../components/SignUpPopup";

/**
 * 
 * @returns 
 */
export default function HomePage() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false);

  const handleLoginClick = () => {
    setShowLoginPopup(true);
  };

  const handleSignUpClick = () => {
    setShowSignUpPopup(true);
  };

  return (
    <div className="home-page">
      <h1 className="welcome">Welcome to Task Manager</h1>
      <div className="separate">
        <div className="login">
            <button className="button" onClick={handleLoginClick}><span className="button-content">Login</span></button>
        </div>
        <div className="sign">
            <button className="button" onClick={handleSignUpClick}><span className="button-content">SignUp</span></button>
        </div>
      </div>
     

      {showLoginPopup && (
        <LoginPopup onClose={() => setShowLoginPopup(false)} />
      )}

      {showSignUpPopup && (
        <SignUpPopup onClose={() => setShowSignUpPopup(false)} />
      )}
    </div>
  );
}
