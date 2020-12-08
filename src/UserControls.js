import React from 'react';
import { Button, TextField, Switch, FormGroup, FormControlLabel } from '@material-ui/core';

function UserControls({includeBomb, numberOfTiles, startGame, updateSettings}){

    const toggleIncludeBomb = () => {
        updateSettings(numberOfTiles, !includeBomb);
    }

    const updateNumberOfTiles = (newVal) =>{

        updateSettings(newVal, includeBomb);
    }

    const start = () => startGame(numberOfTiles, includeBomb);

    const inputProps = {
        step: 2,
        min: 10,
        max: 50
      };

    return (
        <div>
 
            <TextField id="standard-basic" label="Number of tiles" type="number" inputProps={inputProps}  value={numberOfTiles} onChange={event => {
                    const { value } = event.target;
                    updateNumberOfTiles(value);
                }}/>

            <FormGroup className="mt-3">
                <FormControlLabel
                    control={<Switch checked={includeBomb} onChange={toggleIncludeBomb} />}
                    label="Include bombs"
                />
            </FormGroup>

            <FormGroup className="mt-3">
                  <Button id="new-btn" color="primary" onClick={start}>Start</Button>
            </FormGroup>
        </div>
    )
}

export default UserControls;

