import "./style/text.css";

function Text( { className, onClick, ...props } ) {

    className = ( className || "" ) + ( onClick ? " onClick" : "" );

    return (
        <div className={ `Text ${className}` } onClick={ onClick }>
            { props.children }
        </div>
    );
}

export { Text };