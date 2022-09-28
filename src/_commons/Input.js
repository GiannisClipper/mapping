import "./style/input.css";

import { setClassName } from "./logic/helpers";

import { OkIcon, CancelIcon, LockIcon, UnlockIcon, AdminIcon, UserIcon } from "./Icon";

function Input( { className, placeholder, value, onChange } ) {
    return ( 
        <input className={ setClassName( 'Input', className ) }
            placeholder={ placeholder }
            value={ value }
            onChange={ onChange }
            readOnly={ onChange ? false : true }
        /> 
    );
}

function TextareaInput( { className, maxLength, rows, value, onChange } ) {
    return ( 
        <textarea className={ setClassName( 'Input TextareaInput', className ) }
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
        <label className={ setClassName( 'Input CheckboxInput', className ) }>
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
            <UnlockIcon title="Published" />
            <LockIcon title="Unpublished" />
        </CheckboxInput>
    );
}

function CheckUserTypeInput( props ) {
    return (
        <CheckboxInput { ...props }>
            <AdminIcon title="Admin" />
            <UserIcon title="User" />
        </CheckboxInput>
    );
}

export { Input, TextareaInput, CheckboxInput, CheckPublishedInput, CheckUserTypeInput };