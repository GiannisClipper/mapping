import "./style/form.css";

import { Modal } from "./Modal";
import { Text } from "./Basics";
import { CloseIcon } from "./Icon";
import { Rows, Row } from "./Rows";

function Title( { onClose, ...props } ) {

    return (
        <Row className="Title">
            <Text>{ props.children }</Text>
            <CloseIcon onClick={ onClose }/>
        </Row>
    );
}

function Fields( props ) {

    return (
        <Rows className="Fields">
            { props.children }
        </Rows>
    );
}

function Field( { className, ...props } ) {

    return (
        <Row className={ `Field ${className}` }>
            { props.children }
        </Row>
    ) 
}

function Buttons( props ) {

    return (
        <Row className="Buttons">
            { props.children }
        </Row>
    );
}

function Form( props ) {

    return (
        <Modal>
            <Rows className="Form">
                { props.children }
            </Rows>
        </Modal>
    ) 
}

export { Form, Title, Fields, Field, Buttons };