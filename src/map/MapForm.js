import { useEffect } from "react"; 
import { useMapFlow } from "./logic/useMapFlow";
import { useMapValues } from "./logic/useMapValues";
import { useMapValidation } from "./logic/useMapValidation";
import { useMapRequest } from "./logic/useMapRequest";
import { useMessage } from "../commons/logic/useMessage";
import { Form, Title, Fields, Field, Buttons } from "../commons/Form";
import { Text, Input } from "../commons/Basics";
import { CancelButton, OkButton } from "../commons/Button";
import { Message } from "../commons/Message";

function MapForm( { map, onClose } ) {

    const { status, setStatus, setAssets } = useMapFlow();
    const { values, getValue, setValue, onUpdate } = useMapValues( { initial: map, setStatus } );
    const { validation, onValidate } = useMapValidation( { values, setStatus } );
    const { request, onPutRequest } = useMapRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => {
        setAssets( { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } );
    } );

    const onOk = () => setStatus( { clickUpdate: true } );

    const disabledOrNot = status.onRequest ? "disabled" : "";

    return (
        <>
        <Form className={ disabledOrNot }>
            <MapTitle onClose={ onClose } />
            <MapFields getValue={ getValue } setValue={ setValue } />
            <MapButtons onOk={ onOk } onCancel={ onClose } status={ status } />
        </Form>

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

function MapTitle( { onClose } ) {

    return (
        <Title onClose={ onClose } >
            Map form
        </Title>
    );
}

function MapFields( { getValue, setValue } ) {

    return (
        <Fields>
            <Field>
                <Text>Title</Text>
                <Input 
                    value={ getValue( "title" ) }
                    onChange={ e => setValue( "title", e.target.value ) }
                />
            </Field>
            <Field>
                <Text>Description</Text>
                <Input />
            </Field>
        </Fields>
    );
}

function MapButtons( { onOk, onCancel, status } ) {

    return (
    <Buttons>
        <OkButton onClick={ onOk } isWaiting={ status.onRequest } />
        <CancelButton onClick={ onCancel } />
    </Buttons>
    );
}

export { MapForm };