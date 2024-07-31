import React, { useState } from 'react';
import { GoogleLogin, googleLogout, GoogleOAuthProvider } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const clientId = "11471929898-7c74bgss3h1c1f4q13bas5isbo74edfs.apps.googleusercontent.com";

function Login() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [information, setInformation] = useState<any>('')

  
  const handleLogout = () => {
    setIsLoggedIn(false)
    googleLogout();
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className="container">
      {!isLoggedIn ? (
        <GoogleLogin
        onSuccess={credentialResponse => {
          const decoded = jwtDecode(credentialResponse?.credential);
          setInformation(decoded)
          setIsLoggedIn(true)
          console.log(decoded);
          console.log(credentialResponse);
          
        }}
        
        onError={() => {
          console.log('Login Failed');
        }}
      />
      
      ) : (
        
        <div style={{ textAlign: 'center' }}>
          <h1>User Information</h1>
          {<img className="profile" src={information.picture} alt="Profile" />}
          <p>Name: {information.name}</p>
          <p>Email: {information.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
    </GoogleOAuthProvider>
  );
}

export default Login;
