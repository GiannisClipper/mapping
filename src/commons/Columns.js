import "./style/columns.css";

function Columns( { className, ...props } ) {
    return (
        <div className={`Columns ${className}`}>
            { props.children }
        </div>
    );
}

function Column( { className, ...props } ) {
    return (
        <div className={`Column ${className}`}>
            { props.children }
        </div>
    );
}

export { Columns, Column };