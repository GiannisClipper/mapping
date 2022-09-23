import "./style/modal.css";

function Modal( { onClick, ...props } ) {

    return (
        <div className="Modal" onClick={ onClick }>
            { props.children }
        </div>
    )
}

export { Modal };