import React from 'react'

const Header = () => {

    const message = ["N", "O", "T", "E", "B", "O", "O", "K", "!"]
    return (
        <h1 className="container-header">
            { message.map( (word, index) =>
                <span key={index}>{word}</span>
            ) }
        </h1>
    )
}

export default Header
