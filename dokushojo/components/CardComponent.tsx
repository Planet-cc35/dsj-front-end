import { CardType } from "../src/interfaces/CardType";

interface Props {
  card: CardType;
}

const CardComponent: React.FC<Props> = (props) => {
  return (
    <div
      className="card btn text-white bg-secondary mb-3"
      style={{ width: "200px", height: "170px" }}
    >
      <div className="card-header text-center">1</div>
      <div className="card-body">
        <h5 className="card-title"></h5>
        <p className="card-text">{props.card.front}Hint.</p>
        <p className="card-text">
          {props.card.back}Gustavo likes Riven to play.
        </p>
      </div>
    </div>
  );
};

export default CardComponent;
