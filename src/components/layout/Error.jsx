import React from 'react'

function Error({ text }) {
    return (
        <h1 style={{ color: "red", fontSize: "40px" }}>{text ? text : "Errorrr"}</h1>
    )
}

export default Error