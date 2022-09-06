import "./style/basics.css";

function Text( { className, onClick, ...props } ) {

    className = ( className || "" ) + ( onClick ? " onClick" : "" );

    return (
        <div className={ `Text ${className}` } onClick={ onClick }>
            { props.children }
        </div>
    );
}

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

export { Text, Input, InputTextarea };