import { useEffect, useRef, useState } from "react";
import CardComponent from "../components/CardComponent";
import * as cardApi from "./api/cardApi";
import { CardType } from "./interfaces/CardType";
// TODO: update this to deck interface

interface Deck {
  id: number;
}

interface Props {
  deck: Deck;
}

const Deck: React.FC<Props> = (props) => {
  const answerInput = useRef<HTMLInputElement>(null);

  const [useCards, setCards] = useState<CardType[] | null>(null);
  const [useCurrentCard, setCurrentCard] = useState<{
    card: CardType;
    index: number;
  } | null>(null);

  useEffect(() => {
    fetchAllCardsByDeckId();
  }, []);

  const handleSelectCardClick = async (card: CardType, index: number) => {
    const currentCard = { card, index };
    setCurrentCard(currentCard);
  };

  const handleShowAnswerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!answerInput.current || !useCurrentCard) return;
    const button = event.currentTarget;
    if (answerInput.current.value === "") {
      answerInput.current.value = useCurrentCard.card.back;
      button.innerText = "Hide Answer";
      button.classList.remove("btn-primary");
      button.classList.add("btn-secondary");
    } else {
      answerInput.current.value = "";
      button.innerText = "Show Answer";
      button.classList.remove("btn-secondary");
      button.classList.add("btn-primary");
    }
  };

  const handleDeleteSelectedCardClick = async () => {
    if (!useCurrentCard || !useCards) return;
    const result = await cardApi.deleteCardById(useCurrentCard.card.id);
    if (result !== 1) return;
    const cards = useCards.filter((card) => card.id !== useCurrentCard.card.id);
    setCards([...cards]);
    refreshPage();
  };

  const refreshPage = () => {
    if (!answerInput.current) return;
    setCurrentCard(null);
    answerInput.current.value = "";
  };

  const fetchAllCardsByDeckId = async () => {
    //TODO remove this
    props = { deck: { id: 1 } };
    const cards = await cardApi.fetchAllCardsByDeckId(props.deck.id);
    setCards(cards);
  };

  return (
    <section className="d-flex flex-column">
      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <h2 className="mb-3">Name of deck</h2>
          <button className="btn btn-dark">Close</button>
        </div>
        <div className="container text-center my-3e">
          <h3>
            {useCurrentCard
              ? "Card " + (useCurrentCard.index + 1)
              : "Select a card"}
          </h3>
          <label>Answer</label>
          <input
            ref={answerInput}
            className="mx-3"
            placeholder="Your answer is..."
            disabled
          ></input>
          <button className="btn btn-primary" onClick={handleShowAnswerClick}>
            Show Answer
          </button>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-5 gap-3">
          <button
            className="btn btn-dark"
            type="button"
            onClick={handleDeleteSelectedCardClick}
          >
            Delete Card
          </button>
          <button className="btn btn-dark">Edit</button>
        </div>
        <div className="d-flex flex-wrap gap-5 justify-content-center">
          <button
            className="btn btn-success"
            style={{ width: "200px", height: "170px" }}
          >
            + Add Card
          </button>
          {useCards &&
            useCards.map((card: CardType, index) => {
              return (
                <CardComponent
                  key={card.id}
                  card={card}
                  index={index}
                  selectCardClick={handleSelectCardClick}
                ></CardComponent>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default Deck;
