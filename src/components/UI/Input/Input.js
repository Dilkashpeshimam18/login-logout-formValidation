import React from 'react'
import './Input.css'
const Input = (props) => {
    return (
        <div>
            <div
                className={`'control' ${props.isValid === false ? 'invalid' : ''
                    }`}
            >
                <label htmlFor={props.id}>{props.label}</label>
                <input
                    type={props.type}
                    id={props.id}
                    value={props.value}
                    onChange={props.onChange}
                    onBlur={props.onBlur}
                />
            </div>
        </div>
    )
}

export default Input