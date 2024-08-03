import { useState } from "react"
import EditCard from "./EditCard"
import { speechObject } from "./globals"

interface CardProps {
    studyCards: speechObject[]
}
const Card: React.FC<CardProps> = ({studyCards}) => {
    const [cardView, setCardView] = useState<string>("study")
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)
    const [cards, setCards] = useState<speechObject[]>(studyCards);

    const playAudio = (card: speechObject) => {
        const audio = card.audio
        if (audio){
            audio.play()
        }
    }

    const handleSetCardView = (text:string) => {
        setCardView(text)
    }

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % studyCards.length);
    }

    const handlePreviewCardClick = (index: number) => {
        setCurrentCardIndex(index)
    }

    const handleDeleteCard = async () => {
        const currentCard = cards[currentCardIndex]
        try {
            const response = await fetch(`https://back-end-f8b4.onrender.com/flashcards/${currentCard.card_id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                const updatedCards = cards.filter((_, index) => index !== currentCardIndex);
                setCards(updatedCards)
                setCurrentCardIndex((lastIndex) => Math.min(lastIndex, updatedCards.length -1))
            } else {
                console.error("Failed to delete the card.");
            }
        } catch (error) {
            console.error("Error deleting the card:", error);
        }
    };

    const handleShowAnswer = () => {
        setCardView("showAnswer")
    }

    const currentCard = studyCards[currentCardIndex]

    const renderContent = () => {
        switch (cardView) {
            case "study":
    return (
        <>
               <div
                   className="container"
                   key={currentCardIndex}
                   onClick={() => playAudio(currentCard)}
               >
                   Nothing to see here {currentCardIndex}
               </div>
               <button onClick={handleDeleteCard}>Delete this card</button>
               <button onClick={() => handleSetCardView("edit")}>
                   Edit this card
               </button>
               <button onClick={() => playAudio(currentCard)}>
                   Play the audio again
               </button>
               <button onClick={handleNextCard}>Next card</button>
               <button onClick={handleShowAnswer}>Show me the answer</button>

               <div className="next-cards-preview">
                        {studyCards.map((card, index) => {
                            if (index !== currentCardIndex) {
                                return (
                            <div key={index} className="next-card" onClick={() => handlePreviewCardClick(index)}>
                                Nothing to see here either. {card.card_body} {index}
                            </div>
                        )
                    }
                    return null;
                })}
                    </div>
            </>
    ) 
    case "edit":
        return (
        <div>
            <EditCard cardData={currentCard} setCardView={handleSetCardView} />
        </div>
    );
    case "showAnswer":
        return (
            <>
            <div className="container">
                {currentCard.card_body}
            </div>
            <button onClick={() => handleSetCardView("study")}>Back to Study</button>
                        <button onClick={() => handleSetCardView("edit")}>Edit this card</button>
                        <button onClick={handleNextCard}>Next card</button>
                    </>
        );
}
    };

    return (
        <div>
            {renderContent()}
        </div>
    );
}

export default Card