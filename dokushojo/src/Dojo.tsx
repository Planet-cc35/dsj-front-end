import React from "react";
import NewCard from "../components/NewCard";
import { useState, useEffect } from "react";
import Card from "../components/Card";
import { speechObject } from "../components/globals";

const Dojo: React.FC = () => {
const [studyCards, setStudyCards] = useState<speechObject[] | null>(null)
const [view, setView] = useState<string>("study")

useEffect(() => {
  const handleFetchCards = async () => {
    const server = "https://back-end-f8b4.onrender.com/"
    try {
    const response = await fetch(server + "flashcards")
    const cardData = await response.json()
    setStudyCards(cardData);
  } catch (error) {
    console.error("Error fetching the cards. Please be patient.")
  }
}
handleFetchCards()
}, [])

const handleSetView = (text:string)=> {
  setView(text)
}

  return (
    <div className="shoji-container">
      <div className="shoji-door center-left-door"></div>
      <div className="shoji-content">
        <div className="container text-center mw-100">
          <div className="row vh-100">
            <div className="col pt-2"></div>
            <div className="col-7 pt-2">
              <h1>Welcome to the Dojo</h1>
              <button className="btn" onClick={() => handleSetView("newcard")}>Create a new Card</button>
              {(view === "study")? (
                studyCards ? (
              <Card studyCards={studyCards} setView={handleSetView}/>
            ) : (
              <p>Please be patient as the cards are loading.</p>
            )
          ) : (
            <NewCard setView={setView}/>
            )}
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
