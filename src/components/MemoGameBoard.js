import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import MemoTile from './MemoTile';
import ScoreBoard from './ScoreBoard';
import GameBoardGenerator from '../helpers/GameBoardGenerator';
import ScoreHelper from '../helpers/ScoreHelper';

function MemoGameBoard({numberOfTiles = 30, includeBomb, startNewGame}){

    const [gameState, setGameState] = useState(() => {
        let _tiles = GameBoardGenerator.GenerateGameBoard(numberOfTiles, includeBomb);
        return {
            flippedTile : null,
            tiles : _tiles,
            lives : 3
        };
    });

    let initialScoreBoard = {
        lives: 3,
        time: 0,
        stopTime : false
    };
    const [scoreBoard, setScoreBoard] = useState(() => {
        return initialScoreBoard;
    });

    const [finalScore, setFinalScore] = useState(() =>{
        return null;
    });

    const [lock, setLock] = useState(() => {
        return false;
    });

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
    setScoreBoard(initialScoreBoard);
    startNewGame();
  }

  const updateTime = function(secs){
      if(!scoreBoard.stopTime){
        setScoreBoard({
            lives: scoreBoard.lives,
            time: secs,
            stopTime: false
        });
      }else{
        let tilesCompleted = gameState.tiles.filter((obj) => obj.isCompleted === true).length;

        if(!finalScore){
            setFinalScore(ScoreHelper.getFinalScore(scoreBoard.time, tilesCompleted, numberOfTiles, scoreBoard.lives, includeBomb));
        }

        setScoreBoard({
            stopTime: true,
            time: secs -1,
            lives: scoreBoard.lives
        });
      }
  }

  const handleShow = function(_win){
      setScoreBoard({
          stopTime: true,
          time: scoreBoard.time,
          lives: scoreBoard.lives
      })
    setModal({
        show: true,
        win: _win
    });
  }

    const flipTile = (_id, _matchGuid, _isBomb) => {
        if(lock || (gameState.flippedTile !== null && _id === gameState.flippedTile.id)){
            return;
        }
        setLock(true);

        if(_isBomb){
            const _newItems = gameState.tiles.map(item => {
                if (item.isCompleted || item.isBomb) {
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};
            });
            const _newGameState = {
                flippedTile : null,
                tiles : _newItems
            };
            var newScore = {
                lives : scoreBoard.lives -1
            };

            setScoreBoard(newScore);

            if(newScore.lives <= 0){
                setGameState(_newGameState);
                handleShow(false);
                return;
            } 
            else{
                setGameState(_newGameState);
                FlipAfterDelay(600)
            }


            
        }
        
        else if(gameState.flippedTile == null){
            const newItems = gameState.tiles.map(item => {
                if (item.id === _id) {
                    return { ...item, isFlipped: true };
                }
                return item;
            });
            const newGameState = {
                flippedTile : {id: _id, matchGuid: _matchGuid},
                tiles : newItems
            };
            setGameState(newGameState);
            setLock(false);
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
                tiles : newItems
            };

            newItems.forEach(function(item){
                if(item.isCompleted)
                completedCount++;
            });
            if(completedCount == numberOfTiles){
                handleShow(true);
            }
          
            setGameState(newGameState);
            setLock(false);
        }
        else{
            const newItems = gameState.tiles.map(item => {
                if (item.isCompleted) {
                    return { ...item, isFlipped: true};
                }
                else if(item.id === _id || item.id === gameState.flippedTile.id){
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};
              });
              const newGameState = {
                flippedTile : null,
                tiles : newItems
              };
              setGameState(newGameState);
              FlipAfterDelay(2000);

        }

    }

    const FlipAfterDelay = function(delay){
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
            setLock(false);
        }, delay);
    }

    return (
        <div className="memo-board col-12">
                <div>
                <Modal centered={true} animation={false} backdrop="static" show={modal.show}>
                    <Modal.Header>
                    <Modal.Title>{modal.win
                        ?  <span>Congrats</span>  
                        :  <span>Awww</span>
                    } 
                    <p>Your score: {finalScore}</p>
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
            <ScoreBoard lives={scoreBoard.lives} time={scoreBoard.time} updateTime={updateTime} stopTime={scoreBoard.stopTime} />
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

