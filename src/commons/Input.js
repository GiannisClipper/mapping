import "./style/input.css";

import { OkIcon, CancelIcon, PublishedIcon, UnpublishedIcon } from "./Icon";

function Input( { className, placeholder, value, onChange } ) {
    return ( 
        <input className={ `Input ${className}` }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
            readOnly={ onChange ? false : true }
        /> 
    );
}

function InputTextarea( { className, maxLength, rows, value, onChange } ) {
    return ( 
        <textarea className={ `Input InputTextarea ${className}` }
            maxLength = { maxLength || "1000" }
            rows = { rows || "4" }
            value={ value }
            onChange={ onChange }
            readOnly={ onChange ? false : true }
        /> 
    );
}

function InputCheckbox( { className, value, onChange, ...props } ) {
    return (
        <label className={ `Input InputCheckbox ${className || ""}` }>
            <input 
                type="checkbox" 
                checked={ value }
                onChange={ onChange }
                readOnly={ onChange ? false : true }
            />
            { props.children.length > 0
            ? value 
                ? props.children[ 0 ]
                : props.children[ 1 ]
            : value
                ? <OkIcon />
                : <CancelIcon />
            }
        </label>
    );
}

function InputCheckPublished( props ) {
    return (
        <InputCheckbox { ...props }>
            <PublishedIcon />
            <UnpublishedIcon />
        </InputCheckbox>
    );
}

export { Input, InputTextarea, InputCheckbox, InputCheckPublished };