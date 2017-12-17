import React from 'react'
import * as FontAwesome from 'react-icons/lib/fa'
import './Select.css'

const Select = ( props ) => {
    return (
        <div className="container-select">
            <select onChange={props.changeHandler.bind(this)}>
                {props.children}
            </select>
            <span className="sort-icon"><FontAwesome.FaAngleDown /></span>
        </div>
    )
}

export default Select
