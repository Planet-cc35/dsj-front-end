import { useState } from "react"
import EditCard from "./EditCard"
import { speechObject } from "./globals"

interface CardProps {
    studyCards: speechObject[]
}
const Card: React.FC<CardProps> = ({studyCards}) => {
    const [view, setview] = useState<string>("study")
    const [currentCardIndex, setCurrentCardIndex] = useState<number>(0)

    const playAudio = (card: speechObject) => {
        const audio = card.audio
        if (audio){
            audio.play()
        }
    }

    const handleSetView = (text:string) => {
        setview(text)
    }

    const handleNextCard = () => {
        setCurrentCardIndex((prevIndex) => (prevIndex + 1) % studyCards.length);
    }

    const currentCard = studyCards[currentCardIndex]

    return (
        <>
            {(view === "study") ? (
               <>
               <div
                   className="container"
                   key={currentCardIndex}
                   onClick={() => playAudio(currentCard)}
               >
                   Nothing to see here
               </div>
               <button>Delete this card</button>
               <button onClick={() => handleSetView("edit")}>
                   Edit this card
               </button>
               <button onClick={() => playAudio(currentCard)}>
                   Play the audio again
               </button>
               <button onClick={handleNextCard}>Next card</button>
               <button>Show me the answer</button>

               <div className="next-cards-preview">
                        {studyCards.slice(1).map((card, index) => (
                            <div key={index} className="next-card " onClick={() => playAudio(card)}>
                                Nothing to see here either.
                            </div>
                        ))}
                    </div>
            </>
    ): (
        <div>
            <EditCard cardData={currentCard} />
        </div>
    )}
    </>
    )
}

export default Card