// reusable button component
import React from 'react';
import "../Styles/Button.css"

interface LightButtonProps {
    label: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
}

interface RedButtonProps {
    label: string;
    onClick: (e: any) => void;
}

export const LightButton = (props:LightButtonProps) => {
    return (
        <button
            className='btn-light'
            disabled={props.disabled}
            style={{
                cursor: props.disabled ? 'not-allowed' : 'pointer',
            }}
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};

export const RedButton = (props:RedButtonProps) => {
    return (
        <button
            className='btn-red'
            onClick={props.onClick}
        >
            {props.label}
        </button>
    );
};