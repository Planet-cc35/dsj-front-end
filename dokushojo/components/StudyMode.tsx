import React from "react";
// import NewCard from "./NewCard";

const StudyMode: React.FC<any> = () => {
  return (
    <>
      <div className="container">
        <h1>This is the study mode.</h1>
        <div className="container mb-3 main-card">
          <div className="card">
            This is where the study card in position 0 of the card array will
            render.
          </div>
        </div>
        <div className="container next-cards">
          <div className="card sub-card">
            This is where the study cards in the 1-5 index of the cards array
            will go.
          </div>
          <div className="card sub-card">
            This is where the study cards in the 1-5 index of the cards array
            will go.
          </div>
          <div className="card sub-card">
            This is where the study cards in the 1-5 index of the cards array
            will go.
          </div>
          <div className="card sub-card">
            This is where the study cards in the 1-5 index of the cards array
            will go.
          </div>
          <div className="card sub-card">
            This is where the study cards in the 1-5 index of the cards array
            will go.
          </div>
        </div>
        <button>Add a new card to the deck</button>
        {/* <NewCard /> */}
        <button>Switch decks</button>
      </div>
    </>
  );
};

export default StudyMode;
