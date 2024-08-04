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
    const audio = new Audio(card.audio); // Create an Audio object with the URL
    console.log(audio);
    try {
      await audio.load(); // Load the audio data asynchronously
      await audio.play(); // Play the audio
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleSetCardView = (text: string) => {
    setCardView(text);
    if (text === "edit") {
      const newCardBtn: HTMLElement = document.getElementsByClassName(
        "new-card"
      )[0] as HTMLElement;

      newCardBtn.style.display = "none";
    }
    console.log(currentCard.card_id);
  };

  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % studyCards.length);
    console.log(currentCardIndex);
    console.log(cards);
  };

  const handlePreviewCardClick = (index: number) => {
    setCurrentCardIndex(index);
  };

  const handleDeleteCard = async () => {
    const currentCard = cards[currentCardIndex];
    console.log(currentCard);
    console.log(currentCard.card_id);
    console.log;
    try {
      const response = await fetch(
        `https://dokushojo-backend.onrender.com/flashcards/${currentCard.card_id}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        window.location.reload();
        const updatedCards = cards.filter(
          (_, index) => index !== currentCardIndex
        );
        setCards(updatedCards);
        setCurrentCardIndex((lastIndex) =>
          Math.min(lastIndex, updatedCards.length - 1)
        );
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
              Nothing to see here {currentCardIndex}
            </div>
            <button
              className="btn btn-primary btn-lg m-3"
              onClick={handleDeleteCard}
            >
              Delete this card
            </button>
            <button
              className="btn btn-primary btn-lg m-3"
              onClick={() => handleSetCardView("edit")}
            >
              Edit this card
            </button>
            <button
              className="btn btn-primary btn-lg m-3"
              onClick={() => playAudio(currentCard)}
            >
              Play the audio again
            </button>
            <button
              className="btn btn-primary btn-lg m-3"
              onClick={handleNextCard}
            >
              Next card
            </button>
            <button
              className="btn btn-primary btn-lg m-3"
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
                      Nothing to see here either. {card.card_body} {index}
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
              className="btn btn-primary btn-lg m-4"
              onClick={() => handleSetCardView("study")}
            >
              Back to Study
            </button>
            <button
              className="btn btn-primary btn-lg m-4"
              onClick={() => handleSetCardView("edit")}
            >
              Edit this card
            </button>
            <button
              className="btn btn-primary btn-lg m-4"
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
