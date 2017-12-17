import React from 'react';
import './Dropdown.css';
import { Tooltip } from '../../Common'
import * as Icon from 'react-icons/lib/fa'

const Dropdown = ( props ) => {

    let icon = (props.iconType === 'edit') ? <Icon.FaCopy /> : <Icon.FaBars />
    let message = (props.iconType === 'edit') ? "Move!" : ""

    return (
        <div className={`dropdown ${props.className}`}>
            <button className="icon">
                { message !== "" ?
                    <div className="tooltip">{icon}
                        <Tooltip>{message}</Tooltip>
                    </div>
                : <div>{icon}</div> }
            </button>
            <div className="dropdown-content">
                {props.children}
            </div>
        </div>
    );
}

export default Dropdown;
