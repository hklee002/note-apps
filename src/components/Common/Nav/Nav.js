import React from 'react'
import './Nav.css'
import { Header } from '../../Common'

const Nav = ( props ) => {
    return (
        <div className="container-navigation">
            <Header />
            {props.children}
        </div>
    )
}

export default Nav
