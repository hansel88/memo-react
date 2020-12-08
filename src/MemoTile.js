import React from 'react';
var classNames = require('classnames');


function MemoTile({id, imgSrc, matchGuid, isFlipped, isCompleted, flip, isBomb}){
    const flipThis = () => flip(id, matchGuid, isBomb);

    var classes = classNames({
        'memo-tile' : true,
        'back' : isFlipped,
        'front' : !isFlipped,
        'bomb': isBomb,
        'completed' : isCompleted
      });

    return (
        <div className={ classes } onClick={flipThis}>  
            {isFlipped
                ?  <img alt="tile" src={process.env.PUBLIC_URL + imgSrc} /> 
                : <></>
            }
        </div>
    )
}

export default MemoTile;
