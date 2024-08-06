import { useEffect } from "react";
import CardComponent from "../components/CardComponent";
import { fetchAllCardsByDeckId } from "./api/cardApi";
// TODO: update this to deck interface

interface Deck {
  id: number;
}

interface Props {
  deck: Deck;
}

const Deck: React.FC<Props> = (props) => {
  useEffect(() => {
    (async () => {
      //TODO remove this
      props = { deck: { id: 1 } };
      const cards = await fetchAllCardsByDeckId(props.deck.id);
      console.log(cards);
    })();
  }, []);

  return (
    <section className="d-flex flex-column">
      <div className="container my-3">
        <div className="d-flex justify-content-between">
          <h2 className="mb-3">Name of deck</h2>
          <button className="btn btn-dark">Close</button>
        </div>
        <div className="container text-center my-3e">
          <h3>Card 1:</h3>
          <label>Answer</label>
          <input className="mx-3" placeholder="Your answer..."></input>
          <button>Check</button>
        </div>
        <div className="d-flex justify-content-center mt-3 mb-5 ">
          <button className="btn btn-dark" type="button">
            Delete Card
          </button>
          <button className="btn btn-dark">Edit</button>
          <button className="btn btn-dark">Show Answer</button>
        </div>
        <div className="d-flex flex-wrap gap-5 justify-content-center">
          <button
            className="btn btn-success"
            style={{ width: "200px", height: "170px" }}
          >
            + Add Card
          </button>
          {/* <CardComponent></CardComponent> */}
        </div>
      </div>
    </section>
  );
};

export default Deck;
