// reusable button component
import React from 'react';
import "../Styles/Button.css"

interface ButtonProps {
    label: string;
    onClick: () => void;
}

export const LightButton = (props:ButtonProps) => {
    return (
        <button
            className='btn-light'
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export const RedButton = (props:ButtonProps) => {
    return (
        <button
            className='btn-red'
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};