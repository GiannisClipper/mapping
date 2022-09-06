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

    return onChange 

    ? ( <input className={ `Input ${className}` }
        placeholder={ placeholder }
        value={ value }
        onChange={ onChange } /> ) 

    : (<input className={ `Input ${className}` } readOnly={ true }
        placeholder={ placeholder }
        value={ value } /> );
}

export { Text, Input };