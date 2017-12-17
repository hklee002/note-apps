import React from 'react'
import './Tooltip.css'

const Tooltip = ( props ) => {
    return (
        <span className="tooltiptext">{props.children}</span>
    )
}
export default Tooltip
