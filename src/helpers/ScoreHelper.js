import React, {useEffect, useRef } from 'react';

const ScoreHelper = (function() {

    function getFinalScore(secondsSpent, completedTiles, totalTiles, livesLeft, includeBomb) {   
        if(livesLeft == 0)
            livesLeft = 1;

        let x = completedTiles / totalTiles;

        if(x == 1){
            x = 2;
        }

        let timeSpentPerTile = secondsSpent / totalTiles;

        let score = x * (100 / timeSpentPerTile) * (totalTiles * 1.8) ;

        if(includeBomb){
            score = score * livesLeft * 1.2;
        }

        return Math.floor(score);
    }
  
    return {
      getFinalScore: getFinalScore
    };
  })(); 

  export default ScoreHelper;