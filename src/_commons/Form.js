import "./style/form.css";

import { Modal } from "./Modal";
import { Text } from "./Text";
import { CloseMiniButton } from "./Button";
import { Rows, Row } from "./Rows";

function Title( { onClickClose, ...props } ) {

    return (
        <Row className="Title">
            <Text>{ props.children }</Text>
            <CloseMiniButton onClick={ onClickClose }/>
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

function Form( { className, ...props } ) {

    return (
        <Rows className={ `Form ${className}` } { ...props }>
            { props.children }
        </Rows>
    ) 
}

export { Form, Title, Fields, Field, Buttons };