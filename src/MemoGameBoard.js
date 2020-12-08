import React, { useState } from 'react';
import MemoTile from './MemoTile';
import ScoreBoard from './ScoreBoard';
import GameBoardGenerator from './GameBoardGenerator';

function MemoGameBoard({numberOfTiles = 30, includeBomb}){

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

    const flipTile = (_id, _matchGuid, _isBomb) => {
        if(gameState.lock || (gameState.flippedTile !== null && _id === gameState.flippedTile.id)){
            return;
        }



        if(_isBomb){
            const _newItems = gameState.tiles.map(item => {
                if (item.isCompleted) {
                    return { ...item, isFlipped: true};
                }
                return { ...item, isFlipped: false};;
              });
              var x = gameState.lives -1;
              const _newGameState = {
                flippedTile : null,
                tiles : _newItems,
                lock: true
              };
              var newScore = {
                  lives : scoreBoard.lives -1
              };
              setScoreBoard(newScore);
              console.log(_newGameState);
              setGameState(_newGameState);

        
              FlipRecentAfterDelay(600)
            
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

