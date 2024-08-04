import { useState } from "react";
import EditCard from "./EditCard";
import { speechObject } from "./globals";

interface CardProps {
  studyCards: speechObject[];
}
const Card: React.FC<CardProps> = ({ studyCards }) => {
  const [cardView, setCardView] = useState<string>("study");
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [cards, setCards] = useState<speechObject[]>(studyCards);

  const playAudio = async (card: speechObject) => {
    const audio = new Audio(card.audio);
    try {
      await audio.load();
      await audio.play();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleSetCardView = (text: string) => {
    setCardView(text);
    // if (text === "edit") {
    //   const newCardBtn: HTMLElement = document.getElementsByClassName(
    //     "new-card"
    //   )[0] as HTMLElement;

    //   newCardBtn.style.display = "none";
    // }
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % studyCards.length);
    const currentCardIndexHardCode = studyCards[currentCardIndex + 1];
    playAudio(currentCardIndexHardCode);
  };

  const handlePreviewCardClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  const handleDeleteCard = async () => {
    const currentCard = cards[currentCardIndex];

    try {
      const response = await fetch(
        `https://dokushojo-backend.onrender.com/flashcards/${currentCard.card_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedCards = cards.filter(
          (_, index) => index !== currentCardIndex
        );
        setCards(updatedCards);
        setCurrentCardIndex((lastIndex) =>
          Math.min(lastIndex, updatedCards.length - 1)
        );
        setCardView("study");
      } else {
        console.error("Failed to delete the card.");
      }
    } catch (error) {
      console.error("Error deleting the card:", error);
    }
  };

  const handleShowAnswer = () => {
    setCardView("showAnswer");
  };

  const currentCard = studyCards[currentCardIndex];

  const renderContent = () => {
    switch (cardView) {
      case "study":
        return (
          <>
            <div
              className="card w-50 start-50 translate-middle-x my-3"
              key={currentCardIndex}
              onClick={() => playAudio(currentCard)}
            >
              {currentCard.card_body}
            </div>
            <button
              className="btn btn-secondary btn-lg m-3"
              onClick={handleDeleteCard}
            >
              Delete this card
            </button>
            <button
              className="btn btn-secondary btn-lg m-3"
              onClick={() => handleSetCardView("edit")}
            >
              Edit this card
            </button>
            <button
              className="btn btn-secondary btn-lg m-3"
              onClick={() => playAudio(currentCard)}
            >
              Play the audio again
            </button>
            <button
              className="btn btn-secondary btn-lg m-3"
              onClick={handleNextCard}
            >
              Next card
            </button>
            <button
              className="btn btn-secondary btn-lg m-3"
              onClick={handleShowAnswer}
            >
              Show me the answer
            </button>
            <div className="next-cards-preview">
              {studyCards.map((card, index) => {
                if (index !== currentCardIndex) {
                  return (
                    <div
                      key={index}
                      className="card start-25 w-25 m-3 next-card"
                      onClick={() => handlePreviewCardClick(index)}
                    >
                      {card.card_body}
                    </div>
                  );
                }
                return null;
              })}
            </div>
          </>
        );
      case "edit":
        return (
          <div>
            <EditCard cardData={currentCard} setCardView={handleSetCardView} />
          </div>
        );
      case "showAnswer":
        return (
          <>
            <div className="card w-50 start-50 translate-middle-x my-3">
              {currentCard.card_body}
            </div>
            <figure>
              <audio controls src={currentCard.audio}></audio>
            </figure>
            <button
              className="btn btn-secondary btn-lg m-4"
              onClick={() => handleSetCardView("study")}
            >
              Back to study
            </button>
            <button
              className="btn btn-secondary btn-lg m-4"
              onClick={() => handleSetCardView("edit")}
            >
              Edit this card
            </button>
            <button
              className="btn btn-secondary btn-lg m-4"
              onClick={handleNextCard}
            >
              Next card
            </button>
          </>
        );
    }
  };

  return <div>{renderContent()}</div>;
};

export default Card;
