import "./style/rows.css";

function Rows( { className, onClick, ...props } ) {
    return (
        <div className={ `Rows ${className}` } onClick={ onClick } { ...props }>
            { props.children }
        </div>
    );
}

function Row( { className, onClick, ...props } ) {
    return (
        <div className={ `Row ${className}` } onClick={ onClick }>
            { props.children }
        </div>
    );
}

export { Rows, Row };