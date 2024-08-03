import React, { useState } from 'react';
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const clientId = "11471929898-7c74bgss3h1c1f4q13bas5isbo74edfs.apps.googleusercontent.com";

function Login( { } ) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };

  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    setInformation(decoded);
    setIsLoggedIn(true);
    navigate("/dojo", { state: { user: decoded } });
    console.log(decoded);
    console.log(credentialResponse);
  };
  

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <img src='/hello.svg' className="welcome-message" alt='Welcome' />
      <div className="google-login-button">
        {!isLoggedIn ? (
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={handleError}
          />
        ) : (
          <div style={{ textAlign: 'center' }}>
            <h1>User Information</h1>
            {information?.picture && (
              <img className="profile" src={information.picture} alt="Profile" />
            )}
            <p>Name: {information?.name}</p>
            <p>Email: {information?.email}</p>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
