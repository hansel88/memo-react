import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MemoTile from './MemoTile';
import ScoreBoard from './ScoreBoard';
import GameBoardGenerator from './GameBoardGenerator';

function MemoGameBoard({numberOfTiles = 30, includeBomb, startNewGame}){

    const [gameState, setGameState] = useState(() => {
        let _tiles = GameBoardGenerator.GenerateGameBoard(numberOfTiles, includeBomb);
        return {
            flippedTile : null,
            tiles : _tiles,
            lock: false,
            lives : 3
        };
    });

    let initialScoreBoard = {
        lives: 3
    };
    const [scoreBoard, setScoreBoard] = useState(initialScoreBoard);

    let initModal = {
        show: false,
        win: false
    }
    const [modal, setModal] = useState(initModal);

  const startNew = function(){
    setModal({
        show: false,
        win: false
    });
    startNewGame();

  }
  const handleShow = function(_win){
    setModal({
        show: true,
        win: _win
    });
  }

    const flipTile = (_id, _matchGuid, _isBomb) => {
        if(gameState.lock || (gameState.flippedTile !== null && _id === gameState.flippedTile.id)){
            return;
        }



        if(_isBomb){
            const _newItems = gameState.tiles.map(item => {
                if (item.isCompleted) {
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};
              });
              const _newGameState = {
                flippedTile : null,
                tiles : _newItems,
                lock: true
              };
              var newScore = {
                  lives : scoreBoard.lives -1
              };
              setScoreBoard(newScore);
              setGameState(_newGameState);

              FlipRecentAfterDelay(600)

              if(newScore.lives <= 0){
                handleShow(false);
            }
            
        }
        
        if(gameState.flippedTile == null){
            const newItems = gameState.tiles.map(item => {
                if (item.id === _id) {
                    return { ...item, isFlipped: true };
                }
                return item;
            });
            const newGameState = {
                flippedTile : {id: _id, matchGuid: _matchGuid},
                tiles : newItems,
                lock: false
            };
            setGameState(newGameState);
        }
        else if(gameState.flippedTile.matchGuid === _matchGuid){
            let completedCount = 0;
            const newItems = gameState.tiles.map(item => {
                if (item.matchGuid === _matchGuid) {
                    return { ...item, isFlipped: true, isCompleted: true };
                }
                return item;
              });
              const newGameState = {
                flippedTile : null,
                tiles : newItems,
                lock: false
              };

              newItems.forEach(function(item){
                  if(item.isCompleted)
                    completedCount++;
              });
              if(completedCount == numberOfTiles){
                 handleShow(true);
               }
          
              setGameState(newGameState);
        }
        else{
            const newItems = gameState.tiles.map(item => {
                if (item.isCompleted) {
                    return { ...item, isFlipped: true};
                }
                else if(item.id === _id || item.id === gameState.flippedTile.id){
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};;
    
              });
              const newGameState = {
                flippedTile : null,
                tiles : newItems,
                lock: true
              };
              setGameState(newGameState);
              FlipRecentAfterDelay(2000);
        }

    }

    const FlipRecentAfterDelay = function(delay){
        setTimeout(() => {
            const _newItems = gameState.tiles.map(item => {
                if (item.isCompleted) {
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};;
              });
              const _newGameState = {
                flippedTile : null,
                tiles : _newItems,
                lock: false
              };
              setGameState(_newGameState);
        }, delay);
    }

    return (
        <div className="memo-board">
                <div>
                <Modal animation={false} backdrop="static" show={modal.show}>
                    <Modal.Header>
                    <Modal.Title>{modal.win
                        ?  <span>Congrats</span>  
                        :  <span>Awww</span>
                    }
                    </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{modal.win
                        ?   <><img className="modal-img" src={process.env.PUBLIC_URL + '/img/46.png'} /><span>You win! Well played.</span>  </>
                        :  <><img className="modal-img" src={process.env.PUBLIC_URL + '/img/7.png'} /><span>Better luck next time!</span> </>
                    }
                    </Modal.Body>
                    <Modal.Footer>
                    <button id="new-btn" onClick={startNew}>
                        Play again
                    </button>

                    </Modal.Footer>
                </Modal>
                </div>
            <ScoreBoard lives={scoreBoard.lives}/>
            <ul className="tile-list">
                {gameState.tiles.map((tile, i) =>
                <li key={'li' + i}>
                    <MemoTile key={i} flip={flipTile} {...tile}/>
                </li>
                )}
            </ul>

        </div>
    )   

}

export default MemoGameBoard;

