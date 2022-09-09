import "./style/modal.css";

function Modal( props ) {

    return (
        <div className="Modal">
            { props.children }
        </div>
    )
}

export { Modal };