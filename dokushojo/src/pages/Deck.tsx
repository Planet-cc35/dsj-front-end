import { Fragment, useEffect, useRef, useState } from "react";
import CardComponent from "../components/Card";
import * as cardApi from "../api/cardApi";
import DeckCardType from "../interfaces/DeckCardType";
import CardOverlay from "./overlays/CardOverlay";

import { useLocation } from "react-router-dom";

// TODO: update this to deck interface


const Deck = () => {
  //TODO remove this
  const location = useLocation();
  const props = location.state



  const buttonShowAnswer = useRef<HTMLButtonElement>(null);

  const [useIsShowAddCardOverlay, setIsShowAddCardOverlay] =
    useState<boolean>(false);
  const [useIsShowAnswer, setIsShowAnswer] = useState<boolean>(false);
  const [useCards, setCards] = useState<DeckCardType[] | null>(null);
  const [useCurrentCard, setCurrentCard] = useState<{
    card: DeckCardType;
    index: number;
  } | null>(null);

  useEffect(() => {
    fetchAllCardsByDeckId();
  }, []);

  useEffect(() => {
    if (!buttonShowAnswer.current) return;
    const button = buttonShowAnswer.current;
    if (useIsShowAnswer) {
      button.innerText = "Hide Answer";
      button.classList.remove("btn-primary");
      button.classList.add("btn-warning");
    } else {
      button.innerText = "Show Answer";
      button.classList.remove("btn-warning");
      button.classList.add("btn-primary");
    }
  }, [useIsShowAnswer]);

  const handleSelectCardClick = async (
    clickedCard: DeckCardType,
    index: number
  ) => {
    if (!useCards) return;
    const currentCard = { card: clickedCard, index };
    const cards = useCards.map((card) => {
      card.id === clickedCard.id
        ? (card.isSelected = true)
        : (card.isSelected = false);
      return card;
    });
    setCards(cards);
    setCurrentCard(currentCard);
  };

  const handleShowAnswerClick = () => {
    if (!buttonShowAnswer.current) return;
    useIsShowAnswer ? setIsShowAnswer(false) : setIsShowAnswer(true);
  };

  const handleDeleteSelectedCardClick = async () => {
    if (!useCurrentCard || !useCards) return;
    const result = await cardApi.deleteCardById(useCurrentCard.card.id);
    if (result !== 1) return;
    const cards = useCards.filter((card) => card.id !== useCurrentCard.card.id);
    setCards([...cards]);
    setCurrentCard(null);
  };

  const handleCardOverlayClick = () => {
    if (!useIsShowAddCardOverlay) {
      setIsShowAddCardOverlay(true);
      document.body.classList.add("overflow-hidden");
    } else {
      setIsShowAddCardOverlay(false);
      document.body.classList.remove("overflow-hidden");
    }
  };

  const addCardCurrentList = (deckCard: DeckCardType) => {
    if (!useCards) return;
    const cards = useCards.filter((card) => card.id !== deckCard.id);
    setCards([deckCard, ...cards]);
  };

  const fetchAllCardsByDeckId = async () => {
    const cards = await cardApi.fetchAllCardsByDeckId(props.deck.id);
    setCards(cards);
  };

  const clearSelectedCard = () => {
    if (!useCurrentCard || !useCards) return;
    const cards = useCards.map((card) => {
      card.isSelected = false;
      return card;
    });
    setCards([...cards]);
    setCurrentCard(null);
  };

  return (
    <Fragment>
      {useIsShowAddCardOverlay && (
        <CardOverlay
          currentCard={useCurrentCard}
          addCardCurrentList={addCardCurrentList}
          exitClick={handleCardOverlayClick}
          deck={props.deck}
        ></CardOverlay>
      )}
      <section className="d-flex flex-column z-0">
        <div className="container my-3">
          <div className="d-flex justify-content-between">
            <h2 className="mb-3">Name of deck</h2>
            <button className="btn btn-dark">Close</button>
          </div>
          <div
            className="d-flex-column text-center sticky-top border m-auto p-3 bg-light z-1 rounded"
            style={{ width: "fit-content", top: "20px" }}
          >
            <h3>
              {useCurrentCard
                ? "Current Card: " + (useCurrentCard.index + 1)
                : "Select a card"}
            </h3>
            <div className="d-flex flex-column align-items-center justify-content-center gap-3">
              <span className="fs-4">Answer</span>
              <span className="d-flex bg-white px-5 py-2 text-secondary">
                {useIsShowAnswer && useCurrentCard
                  ? useCurrentCard.card.back
                  : "You answer is..."}
              </span>
              <button
                ref={buttonShowAnswer}
                className="btn btn-primary"
                onClick={handleShowAnswerClick}
              >
                Show Answer
              </button>
            </div>
          </div>
          <div className="d-flex justify-content-center m-4 gap-5">
            <button
              className="btn btn-info"
              onClick={() => {
                useCurrentCard && handleCardOverlayClick();
              }}
            >
              Edit Card
            </button>
            <button
              className="btn btn-danger"
              type="button"
              onClick={handleDeleteSelectedCardClick}
            >
              Delete Card
            </button>
          </div>
          <div className="d-flex flex-wrap gap-5 justify-content-center">
            <button
              className="btn btn-success"
              style={{ width: "200px", height: "170px" }}
              onClick={() => {
                clearSelectedCard();
                handleCardOverlayClick();
              }}
            >
              + Add Card
            </button>
            {useCards &&
              useCards.map((card: DeckCardType, index) => {
                return (
                  <CardComponent
                    key={card.id}
                    card={card}
                    index={index}
                    selectCardClick={handleSelectCardClick}
                    isShowAnswer={useIsShowAnswer}
                  ></CardComponent>
                );
              })}
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Deck;
