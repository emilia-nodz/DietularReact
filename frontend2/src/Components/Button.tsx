// reusable button component
import React from 'react';
import "../Styles/Button.css"

interface ButtonProps {
    label: string;
    disabled?: boolean;
}

export const LightButton = (props:ButtonProps) => {
    return (
        <button
            className='btn-light'
            disabled={props.disabled}
            style={{
                cursor: props.disabled ? 'not-allowed' : 'pointer',
            }}
        >
            {props.label}
        </button>
    );
};

export const RedButton = (props:ButtonProps) => {
    return (
        <button
            className='btn-red'
            disabled={props.disabled}
            style={{
                cursor: props.disabled ? 'not-allowed' : 'pointer',
            }}
        >
            {props.label}
        </button>
    );
};