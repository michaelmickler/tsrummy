import React from "react";
import TurnPhase from "../../models/TurnPhase";

const GamePile = React.lazy(() => import("../GamePile/Index"));
const PlayerScore = React.lazy(() => import("../PlayerScore/Index"));

interface IPlayerCardsProps {
  game: IGame;
  updateId: string;
}

export const PlayerCards: React.FC<IPlayerCardsProps> = ({ game, updateId }) => {

  let [index, setIndex] = React.useState(-1);
  let [card, setCard] = React.useState(null);

  const DiscardToPile: any = (e: Event) => { game.Discard(index); CancelCard(); };
  const StageCard: any = (e: Event) => { game.Stage(index, game.ActivePlayer()); CancelCard(); };
  const UnStageCard: any = (e: Event) => { game.UnStage(index, game.ActivePlayer()); CancelCard(); };
  const CancelCard: any = (e: Event) => { setIndex(-1); };
  const Score: any = (e: Event) => { game.Score(); CancelCard(); }

  let p = game.ActivePlayer();
  
  const onPileClick = (e: Event, i: number, c: ICard) => {   
    if (game.turn.phase === TurnPhase.Play) {
      setCard(c);
      setIndex(i);
    }
  };

  const canDiscard = () => game.turn.cantDiscard !== card;
  const cardsStaged = () => p.staging.length > 0;
  const cardStaged = () => p.staging.indexOf(card) > -1;

  return <div className={`PlayerCards`}>
    <div><strong>{p.name}</strong><hr /></div>
    <div style={{ height: "180px" }}>
      <React.Suspense fallback="Loading ....">
        <GamePile onClick={onPileClick} pile={p.hand} />
      </React.Suspense>
    </div>
    <div style={{ height: "180px" }}>
      <React.Suspense fallback="Loading ....">
        <GamePile onClick={onPileClick} pile={p.staging} />
      </React.Suspense>
    </div>
    <div style={{ height: "180px" }}>
      <React.Suspense fallback="Loading ....">
        <PlayerScore game={game} />
      </React.Suspense>
    </div>    
    {
      index > -1 && <div className="PlayPopUp">
        {
          cardStaged()
            ? <span><span role="button" onClick={UnStageCard}>Do Not Play</span><span> | </span></span>
            : <span><span role="button" onClick={StageCard}>Play</span><span> | </span></span>
        }
        {
          !cardsStaged() && canDiscard() && <span><span role="button" onClick={DiscardToPile}>Discard</span><span> | </span></span>
        }
        {
          cardsStaged() && <span><span role="button" onClick={Score}>Score</span><span> | </span></span>
        }        
        <span role="button" onClick={CancelCard}>Cancel</span>        
      </div>
    }
  </div>;

};

export default PlayerCards;