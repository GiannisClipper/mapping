import "./style/input.css";

import { OkIcon, CancelIcon } from "./Icon";

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

function InputCheckbox( { className, value, onChange } ) {
    return (
        <label className={ `Input InputCheckbox ${className}` }>
            <input 
                type="checkbox" 
                checked={ value }
                onChange={ onChange }
                readOnly={ onChange ? false : true }
            />
            { value ? <OkIcon/> : <CancelIcon />}
        </label>
    );
}

export { Input, InputTextarea, InputCheckbox };