import React from "react";
import NewCard from "../components/NewCard";
import { useState, useEffect } from "react";

function Dojo() {
const [studyCards, setStudyCards] = useState<any [] | null>(null)
const [view, setView] = useState<string>("newCard")

useEffect(() => {
  const handleFetchCards = async () => {
    try {
    const response = await fetch("https://back-end-f8b4.onrender.com/flashcards")
    const cardData = await response.json()
    setStudyCards(cardData);
  } catch (error) {
    console.error("Error fetching the cards. Please be patient.")
  }
}
handleFetchCards()
}, [])

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
              <Card studyCards={studyCards}></Card>
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
