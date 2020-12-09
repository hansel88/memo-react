import React from 'react';
import ReactCardFlip from 'react-card-flip';
var classNames = require('classnames');


function MemoTile({id, imgSrc, matchGuid, isFlipped, isCompleted, flip, isBomb, setIsFlipped}){
    const flipThis = () => flip(id, matchGuid, isBomb);

    var classes = classNames({
        'memo-tile' : true,
        'back' : isFlipped,
        'front' : !isFlipped,
        'bomb': isBomb,
        'completed' : isCompleted
      });

    return (
       <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
        <div onClick={flipThis} className={classes}>
            
          
        </div>
 
        <div className={classes}>
            <img alt="tile" src={process.env.PUBLIC_URL + imgSrc} /> 
          
        </div>
      </ReactCardFlip>
    )
}

export default MemoTile;
