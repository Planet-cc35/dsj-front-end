import { useEffect, useState } from "react";
import {
  GoogleLogin,
  googleLogout,
  GoogleOAuthProvider,
} from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { UserType } from "../interfaces/UserType";
import { CreateCustomerType } from "../interfaces/CreateCustomerType";
const clientId =
  "11471929898-7c74bgss3h1c1f4q13bas5isbo74edfs.apps.googleusercontent.com";
// const server = "https://dokushojo-backend.onrender.com";
const server = import.meta.env.VITE_SERVER;

function Login({}) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [information, setInformation] = useState<any>(null);  //it is the logged in email
  const [userId, setUserId] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {}, [newUser]);

  useEffect(() => {
    getAllUserEmails();
  }, [isLoggedIn]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    googleLogout();
  };
  const handleError = () => {
    console.log("Login Failed");
  };

  const handleSuccess = async (credentialResponse: any) => {
    const decoded:UserType = await jwtDecode(credentialResponse?.credential);
    setInformation(decoded.email);
    setIsLoggedIn(true);
    setName(decoded.name);
  };

  const getAllUserEmails = async () => {
    const check = await(await fetch(server + "/")).json()
    let count = 0;
    if(!check) return;
    for(const obj of check){
      if(information === obj.email_address){
        count ++;
        setUserId(obj.id);
      }
    }
    if(count < 1){
      createNewAccount();
    }
  }

  const createNewAccount = async() => {
    if(!information) return;
    const customer: CreateCustomerType = {
      email_address: information,
    };
    const request = await fetch(server + "/customers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(customer),
    });
    let final = await request.json();
    setUserId(final.id);
  }

  return (
    <div className="card">
      <GoogleOAuthProvider clientId={clientId}>
      <img width={500} src="Dokushojo.svg" className="m-auto" alt="Dokushojo"/>
        <div className="m-auto">
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
              <p>Name: {name}</p>
              <p>Email: {information}</p>
              <button className="btn btn-outline-primary" onClick={() => navigate("/decks", { state: { userId: userId} })}>Proceed</button>
              <button className="btn btn-outline-secondary" onClick={handleLogout}>Logout</button>
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
    </div>
  );
}

export default Login;
