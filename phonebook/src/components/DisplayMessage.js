import React from 'react'

const DisplayMessage = ({ message }) => {
    const errorStyle = {
        borderStyle: 'solid',
        borderColor: 'red',
        borderRadius: 3,
        color: 'red',
        fontSize: 20,
        padding: 10,
        marginTop:10
    }

    const messageStyle = {
        borderStyle: 'solid',
        borderColor: 'green',
        borderRadius: 3,
        color: 'green',
        fontSize: 20,
        padding: 10,
        marginTop:10
    }

    if (message === null) {
        return null
    } else {
        return (
            <div
                style={message.isError
                    ? errorStyle
                    : messageStyle}>
                {message.text}
            </div>
        )
    }
}

export default DisplayMessage