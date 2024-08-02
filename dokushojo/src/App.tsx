import React from "react";
import Login from "../components/Login";

function App() {

  return (
    <>
      <div className="container text-center mw-100">
        <div className="row vh-100">
          <div className="col-9 pt-2"></div>
          <div className="col mx-auto pt-2">
            <div className="mx-auto">
              <Login></Login>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;