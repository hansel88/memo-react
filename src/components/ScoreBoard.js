import React, {useState} from 'react';
import TimeHelper from '../helpers/timeHelper';

function ScoreBoard( {lives, updateTime, stopTime = false} ){

    const [formattedTime, setFormattedTime] = useState(() => {
        return "00:00";
    })

    const [seconds, setSeconds] = useState(() => {
        return 0;
    })

    const tick = function(){
        if(!stopTime){
            setSeconds(seconds +1);
            updateTime(seconds);
            setFormattedTime(TimeHelper.getFormattedTime(seconds));
        }else{
            setSeconds(seconds);
            updateTime(seconds);
        }
    }

    TimeHelper.useInterval(tick, 1000);

    return (
        <>
        <div className="scoreboard col-12">
            <span className="time">Time: {formattedTime} </span>
            <span className="lives">Lives left: {lives}</span>
        </div>

        </>
    )
}

export default ScoreBoard;