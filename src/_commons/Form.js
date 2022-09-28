import "./style/form.css";

import { setClassName } from "./logic/helpers";
import { Rows, Row } from "./Rows";
import { Text } from "./Text";
import { CloseButton } from "./Button";

function Form( { className, ...props } ) {

    // to prevent the click event passing to Modal and triggering Modal onClose()
    // whenever a Modal exists as a background of the Form, 
    const onClick = e => e.stopPropagation();

    return (
        <Rows className={ setClassName( 'Form', className ) } onClick={ onClick } { ...props }>
            { props.children }
        </Rows>
    ) 
}

function Title( { onClickClose, ...props } ) {

    return (
        <Row className="Title">
            <Text>{ props.children }</Text>
            <CloseButton onClick={ onClickClose }/>
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
        <Row className={ setClassName( 'Field', className ) }>
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

export { Form, Title, Fields, Field, Buttons };