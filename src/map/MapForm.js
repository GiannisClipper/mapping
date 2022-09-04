import { useMessage } from "../commons/logic/useMessage";
import { useMapValues } from "./logic/useMapValues";
import { Form, Title, Fields, Field, Buttons } from "../commons/Form";
import { Text, Input } from "../commons/Basics";
import { CancelButton, OkButton } from "../commons/Button";
import { Message } from "../commons/Message";

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

function MapButtons( { onOk, onCancel } ) {

    return (
    <Buttons>
        <OkButton onClick={ onOk } />
        <CancelButton onClick={ onCancel } />
    </Buttons>
    );
}

function MapForm( { map, onClose } ) {

    const { message, openMessage, closeMessage } = useMessage();

    const { getValue, setValue, updateMap } = useMapValues( { map, onError: openMessage } );

    const onOk = () => {
        if ( updateMap() ) {
            onClose();
        }
    }

    return (
        <>
        <Form>
            <MapTitle onClose={ onClose } />
            <MapFields getValue={ getValue } setValue={ setValue } />
            <MapButtons onOk={ onOk } onCancel={ onClose } />
        </Form>

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

export { MapForm };