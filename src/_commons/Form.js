import "./style/form.css";

import { setClassName } from "./logic/helpers";
import { Rows, Row } from "./Rows";
import { Text } from "./Text";
import { CloseMiniButton, UpdateButton, DeleteButton, CancelButton } from "./Button";

function Form( { className, ...props } ) {

    // whenever a Modal standing as dark background of the Form, 
    // a click event passing to Modal fires Modal onClose()
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

function UpdateButtons( { onClickUpdate, onClickCancel, status } ) {

    return (
        <Buttons>
            <UpdateButton onClick={ onClickUpdate } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

function DeleteButtons( { onClickDelete, onClickCancel, status } ) {

    return (
        <Buttons>
            <DeleteButton onClick={ onClickDelete } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

export { Form, Title, Fields, Field, Buttons, UpdateButtons, DeleteButtons };