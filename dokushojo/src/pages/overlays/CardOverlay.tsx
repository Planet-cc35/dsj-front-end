import React, { useRef } from "react";
import TableDeck from "../../interfaces/TableDeck";
import * as cardApi from "../../api/cardApi";
import AddCardType from "../../interfaces/AddCardType";
import DeckCardType from "../../interfaces/DeckCardType";
import TableCardType from "../../interfaces/TableCardType";
import BaseCardType from "../../interfaces/BaseCardType";

interface Props {
  deck: TableDeck;
  currentCard: {
    card: TableCardType;
    index: number;
  } | null;
  addCardCurrentList: (card: DeckCardType) => void;
  exitClick: () => void;
}

const CardOverlay: React.FC<Props> = (props) => {
  const textareaFront = useRef<HTMLTextAreaElement>(null);
  const textareaBack = useRef<HTMLTextAreaElement>(null);

  const isValidInputs = () => {
    if (!textareaFront.current || !textareaBack.current) return;
    if (textareaBack.current.value.trim() === "") {
      textareaBack.current.classList.add("bg-danger-subtle");
      return false;
    } else {
      textareaBack.current.classList.remove("bg-danger-subtle");
    }

    return true;
  };

  const addCardClick = async () => {
    if (!textareaFront.current || !textareaBack.current) return;
    if (!isValidInputs()) return;

    const addCard: AddCardType = {
      deck_id: props.deck.id,
      front: textareaFront.current.value,
      back: textareaBack.current.value,
    };

    const response = await cardApi.addCard(addCard);
    const deckCard: DeckCardType = response;
    props.addCardCurrentList(deckCard);
    props.exitClick();
  };

  const updateCardClick = async () => {
    if (!textareaFront.current || !textareaBack.current || !props.currentCard)
      return;
    if (!isValidInputs()) return;

    const baseCard: BaseCardType = {
      front: textareaFront.current.value,
      back: textareaBack.current.value,
    };

    const response = await cardApi.updateCard(
      props.currentCard.card.id,
      baseCard
    );
    const deckCard: DeckCardType = response;
    props.addCardCurrentList(deckCard);
    props.exitClick();
  };

  const clearClick = () => {
    if (!textareaFront.current || !textareaBack.current) return;
    textareaFront.current.value = "";
    textareaBack.current.value = "";
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center position-fixed z-2 bg-black bg-opacity-75"
      style={{ width: "100%", height: "100%" }}
    >
      <form className="card bg-primary-subtle border-5 border-primary-subtle z-1">
        <h2 className="card-header fs-4 text-center">
          {props.currentCard
            ? "Update Card " + (props.currentCard.index + 1)
            : "New Card"}
        </h2>
        <div className="card-body d-flex-column gap-3">
          <p className="input-group">
            <span className="input-group-text bg-info-subtle">Front</span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              defaultValue={
                props.currentCard ? props.currentCard.card.front : undefined
              }
              ref={textareaFront}
            ></textarea>
          </p>
          <p className="input-group">
            <span className="input-group-text bg-info-subtle">Back * </span>
            <textarea
              className="form-control"
              aria-label="With textarea"
              defaultValue={
                props.currentCard ? props.currentCard.card.back : undefined
              }
              ref={textareaBack}
            ></textarea>
          </p>
          <button className="btn btn-primary">Test Audio</button>
          <div className="d-flex btn-group">
            <button
              type="button"
              className="btn btn-success"
              onClick={() =>
                props.currentCard ? updateCardClick() : addCardClick()
              }
            >
              Send
            </button>
            <button
              type="button"
              className="btn btn-light"
              onClick={clearClick}
            >
              Clear
            </button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={props.exitClick}
            >
              Close
            </button>
          </div>
        </div>
      </form>
      <div
        role="button"
        className="position-absolute"
        style={{ width: "100%", height: "100%" }}
        onClick={props.exitClick}
      ></div>
    </div>
  );
};

export default CardOverlay;
