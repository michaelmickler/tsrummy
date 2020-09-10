import React from "react";
import Game from "../../models/Game";
import Move from "../../models/Move";
import { TurnResult } from "../../models/Turn";

const GamePile = React.lazy(() => import("../GamePile/Index"));

interface IPlayerScoreProps { game: Game; }

export const PlayerScore: React.FC<IPlayerScoreProps> = ({ game }) => {
  
  let h = game.GetScoreHistory();

  return <div>
    {
      Object.keys(h).map((key: string, keyIndex: number) => {        
        return <div key={keyIndex}>
          <div><strong>{key}</strong></div>
          {
            h[key].map((turn: TurnResult, moveIndex) => {
              return <div key={moveIndex}>              
                {
                  turn.moves.map((move: Move, i) => {
                    return <div key={i} style={{ height: "180px" }}>
                      <React.Suspense fallback="Loading ....">
                        <GamePile pile={move.cards} />
                      </React.Suspense>
                    </div>;
                  })
                }
              </div>;
            })
          }
        </div>;
      })
    }
  </div>;

};

export default PlayerScore;