import { useState } from "react";
import { CardType } from "../src/interfaces/CardType";

interface Props {
  card: CardType;
  index: number;
  selectCardClick: (card: CardType, index: number) => void;
}

const CardComponent: React.FC<Props> = (props) => {
  const [useIsShowAnswer, setIsShowAnswer] = useState<boolean>(false);

  return (
    <div
      className="card btn text-white bg-secondary mb-3"
      style={{ width: "200px", height: "170px" }}
      onClick={() => props.selectCardClick(props.card, props.index)}
    >
      <div className="card-header text-center">{props.index + 1}</div>
      <div className="card-body">
        <h5 className="card-title"></h5>
        {!useIsShowAnswer ? (
          <p className="card-text">{props.card.front}</p>
        ) : (
          <p className="card-text">{props.card.back}</p>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
