import React from 'react'
import './Button.css'

const Button = ( props ) => (
    <button type={props.type} value={props.value} className={`btn transition ${props.className}`} onClick={props.onClickHandler}>{props.children}</button>
)

export default Button
