import React from "react";
import NewCard from "../components/NewCard";

function Dojo() {
  return (
    <div className="shoji-container">
      <div className="shoji-door center-left-door"></div>
      <div className="shoji-content">
        <div className="container text-center mw-100">
          <div className="row vh-100">
            <div className="col pt-2"></div>
            <div className="col-7 pt-2">
              <h1>Welcome to the Dojo.</h1>
              <NewCard></NewCard>
            </div>
            <div className="col mx-auto pt-2"></div>
          </div>
        </div>
      </div>
      <div className="shoji-door center-right-door"></div>
    </div>
  );
}

export default Dojo;
