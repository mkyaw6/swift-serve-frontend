import React from 'react';
import { Label, Dropdown } from 'semantic-ui-react';
import './ModeDropdown.css';

function ModeDropdown(props){
    const items = [];
    const modes = ['Table', 'Wall']
    modes.forEach( (mode) => {
        items.push(<Dropdown.Item key={mode} text={mode} onClick={() => props.setMode(mode)} />)
    })
    return(
    <div data-testid="ModeDropdown">
        <Label> Mode: </Label>
        <Dropdown className= "ui mini button" text= {props.mode.toString()}>
        <Dropdown.Menu>
            {items}
        </Dropdown.Menu>
        </Dropdown>
    </div>
    )
}

export default ModeDropdown