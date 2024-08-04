import { useEffect, useState } from "react";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

const clientId =
  "11471929898-7c74bgss3h1c1f4q13bas5isbo74edfs.apps.googleusercontent.com";
const server = "https://dokushojo-backend.onrender.com";

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
    console.log(userId);
  }, []);
  useEffect(() => {}, []);

  useEffect(() => {}, [userObject]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };

  const handleSuccess = (credentialResponse: any) => {
    const decoded = jwtDecode(credentialResponse?.credential);
    setInformation(decoded);
    setIsLoggedIn(true);
    navigate("/dojo", { state: { user: decoded } });

    // const email = decoded.email;

    // for (const user of userId) {
    //   console.log(decoded.email);
    //   if (user.email_address === decoded.email) {
    //     setUserObject(user.user_id);
    //     console.log(userObject);
    //     navigate("/dojo", { state: { user: decoded } });
    //   } else if (user.email_address !== decoded.email) {
    //     setNewUser({ email_address: email });
    //     handleCreateNewUser(newUser);
    //   }
    // }

    console.log(decoded);
    console.log(credentialResponse);
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
  );
}

export default Login;
