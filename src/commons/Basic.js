import "./style/basic.css";

function Icon( { title, onClick, ...props } ) {

    const className = onClick ? "onClick" : "";

    return (
        <div className={ `Icon ${className}` } title={ title } onClick={ onClick }>
            { props.children }
        </div>
    );
}

function Text( { onClick, ...props } ) {
    return (
        <div className="Text" onClick={ onClick }>
            { props.children }
        </div>
    );
}

export { Icon, Text };