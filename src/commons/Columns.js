import "./style/columns.css";

function Columns( { className, onClick, ...props } ) {
    return (
        <div className={`Columns ${className}`} onClick={ onClick }>
            { props.children }
        </div>
    );
}

function Column( { className, onClick, ...props } ) {
    return (
        <div className={`Column ${className}`} onClick={ onClick }>
            { props.children }
        </div>
    );
}

export { Columns, Column };