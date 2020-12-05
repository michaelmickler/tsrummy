import React from "react";

const GamePile = React.lazy(() => import("../GamePile/Index"));

interface IPlayerScoreProps { game: IGame; }

export const PlayerScore: React.FC<IPlayerScoreProps> = ({ game }) => {
  
  let h = game.GetScoreHistory();

  return <div>
    {
      Object.keys(h).map((key: string, keyIndex: number) => {    
        return <div key={keyIndex}>
          <div><strong>{key}</strong></div>
          {
            h[key].map((turn: ITurnResult, moveIndex) => {
              return <div key={moveIndex}>              
                {
                  turn.moves.map((move: IMove, i) => {
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