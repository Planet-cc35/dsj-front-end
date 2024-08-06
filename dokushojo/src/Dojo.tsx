import React from "react";
import { useLocation } from "react-router-dom";
import NewCard from "../components/NewCard";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { speechObject } from "../components/globals";

const Dojo: React.FC = () => {
  const location = useLocation();
  const { user } = location.state || {};
  const [studyCards, setStudyCards] = useState<speechObject[] | null>(null);
  const [view, setView] = useState<string>("study");

  useEffect(() => {
    const handleFetchCards = async () => {
      // const server = "https://dokushojo-backend.onrender.com/";
      const server = import.meta.env.VITE_SERVER;
      try {
        const response = await fetch(server + "flashcards");
        const cardData = await response.json();
        setStudyCards(cardData);
      } catch (error) {
        console.error("Error fetching the cards. Please be patient.");
      }
    };
    handleFetchCards();
  }, [studyCards]);

  const handleSetView = (text: string) => {
    setView(text);
  };

  return (
    <div className="shoji-container">
      <div className="shoji-door center-left-door"></div>
      <div className="shoji-content">
        <div className="container text-center mw-100">
          <div className="row vh-100">
            <div className="col pt-2"></div>
            <div className="col-7 pt-2 ">
              <h1>Welcome to the Dojo</h1>
              {/* USER PROFILE INFORMATION */}
              <div className="profile-container">
                {user && (
                  <>
                    {user.picture && (
                      <img
                        className="profile"
                        src={user.picture}
                        alt="Profile"
                      />
                    )}
                  </>
                )}
              </div>
              {/* USER PROFILE INFORMATION */}
              <button
                className="btn btn-primary btn-lg m-3 new-card"
                onClick={() => handleSetView("newcard")}
              >
                Create a new Card
              </button>
              {view === "study" ? (
                studyCards ? (
                  <Card studyCards={studyCards} />
                ) : (
                  <p>Please be patient as the cards are loading.</p>
                )
              ) : (
                <NewCard setView={setView} />
              )}
            </div>
            <div className="col mx-auto pt-2"></div>
          </div>
        </div>
      </div>
      <div className="shoji-door center-right-door"></div>
    </div>
  );
};

export default Dojo;
