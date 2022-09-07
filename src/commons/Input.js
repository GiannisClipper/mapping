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

function TextareaInput( { className, maxLength, rows, value, onChange } ) {
    return ( 
        <textarea className={ `Input TextareaInput ${className}` }
            maxLength = { maxLength || "1000" }
            rows = { rows || "4" }
            value={ value }
            onChange={ onChange }
            readOnly={ onChange ? false : true }
        /> 
    );
}

function CheckboxInput( { className, value, onChange, ...props } ) {
    return (
        <label className={ `Input CheckboxInput ${className || ""}` }>
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

function CheckPublishedInput( props ) {
    return (
        <CheckboxInput { ...props }>
            <PublishedIcon />
            <UnpublishedIcon />
        </CheckboxInput>
    );
}

export { Input, TextareaInput, CheckboxInput, CheckPublishedInput };