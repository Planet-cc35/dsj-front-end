import { useEffect, useState } from "react";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { UserType } from "../src/interfaces/UserType";

const clientId =
  "11471929898-7c74bgss3h1c1f4q13bas5isbo74edfs.apps.googleusercontent.com";
// const server = "https://dokushojo-backend.onrender.com";
const server = import.meta.env.VITE_SERVER;

function Login({}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(null);
  const [userId, setUserId] = useState<any>([]);
  const [newUser] = useState<object>({
    email_address: "",
  });
  const [userObject] = useState<null>(null);
  const navigate = useNavigate();

  useEffect(() => {}, [newUser]);

  useEffect(() => {
    handleGetId();
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {}, [userObject]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };

  const handleSuccess = async (credentialResponse: any) => {
    const decoded:UserType = await jwtDecode(credentialResponse?.credential);
    setInformation(decoded.email);
    setIsLoggedIn(true);
    navigate("/decks", { state: { userEmail: decoded.email } });
  };

  const handleError = () => {
    console.log("Login Failed");
  };

  const handleGetId = async () => {
    try {
      const res = await fetch(server + "/", {
        method: "GET",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const jsonRes = await res.json();
      setUserId(jsonRes);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  // const handleCreateNewUser = async (user: string) => {
  //   try {
  //     const response = await fetch(server + "/users", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(user),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Failed to create the new user");
  //     }
  //     setUserObject(user.user_id);
  //     navigate("/dojo", { state: { user: information } });
  //   } catch (error) {
  //     console.error("Error creating user:", error);
  //   }
  // };

  return (
    <>
      <GoogleOAuthProvider clientId={clientId}>
        <img src="/hello.svg" className="welcome-message" alt="Welcome" />
        <div className="google-login-button">
          {!isLoggedIn ? (
            <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
          ) : (
            <div style={{ textAlign: "center" }}>
              <h1>User Information</h1>
              {information?.picture && (
                <img
                  className="profile"
                  src={information.picture}
                  alt="Profile"
                />
              )}
              <p>Name: {information?.name}</p>
              <p>Email: {information?.email}</p>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </GoogleOAuthProvider>
      <div className="emergency-btn">
        {/* <button className="btn" onClick={() => navigate("/dojo")}> */}
        <button className="btn" onClick={() => navigate("/decks")}>
          Click in case of emergency
        </button>
      </div>
    </>
  );
}

export default Login;
