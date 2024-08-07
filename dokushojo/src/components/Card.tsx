import DeckCardType from "../interfaces/DeckCardType";
import utils from "../utils";

interface Props {
  card: DeckCardType;
  index: number;
  isShowAnswer: boolean;
  selectCardClick: (card: DeckCardType, index: number) => void;
}

const CardComponent: React.FC<Props> = (props) => {
  const handlePlayClick = () => {
    utils.playAudio(props.card.audio_url);
  };

  return (
    <div
      className={`btn card text-white p-0 border-3 ${
        props.card.isSelected ? "bg-primary" : "bg-secondary"
      }`}
      style={{ width: "200px", height: "170px" }}
      onClick={() => {
        props.selectCardClick(props.card, props.index);
        handlePlayClick();
      }}
    >
      <div className="card-header text-center">{props.index + 1}</div>
      <div
        className={`card-body d-flex justify-content-center align-items-center ${
          props.isShowAnswer && "bg-warning-subtle text-black"
        }`}
      >
        {!props.isShowAnswer ? (
          <p className="card-text">{props.card.front}</p>
        ) : (
          <p className="card-text">{props.card.back}</p>
        )}
      </div>
    </div>
  );
};

export default CardComponent;
