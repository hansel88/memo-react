import React, {useEffect, useRef } from 'react';

const ScoreHelper = (function() {

    function getFinalScore(secondsSpent, completedTiles, totalTiles, livesLeft, includeBomb) {  
        if(livesLeft == 0)
            livesLeft = 1;

        let completedRatio = completedTiles / totalTiles;

        if(completedRatio == 1){ 
            completedRatio = 2;
        }

        let timeSpentPerTile = secondsSpent / totalTiles;

        let score = ((10 * completedRatio) * (100 / timeSpentPerTile) * (totalTiles * 6) / 2);

        if(includeBomb){
            score = score * livesLeft * 1.5;
        }

        return Math.floor(score);
    }
  
    return {
      getFinalScore: getFinalScore
    };
  })(); 

  export default ScoreHelper;