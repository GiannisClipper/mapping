import { useCreateMap, useUpdateMap, useDeleteMap } from "./logic/useMap";
import { Modal } from "../_commons/Modal";
import { Form, Title, Fields, Field, Buttons } from "../_commons/Form";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { NullIcon } from "../_commons/Icon";
import { Input, TextareaInput, CheckPublishedInput } from "../_commons/Input";
import { AddButton, NullButton, CancelButton, UpdateButton, DeleteButton } from "../_commons/Button";
import { Message } from "../_commons/Message";

function CreateMapForm( { map, onClose } ) {

    const { getValue, setValue, status, setStatus, message, closeMessage } = useCreateMap( { map, onClose } );

    const onClickCreate = () => setStatus( { triggeredFlow: true } );

    return (
        <>
        <NullIcon />
        <Input
            placeholder="Create new map..."
            value={ getValue( "title" ) }
            onChange={ e => setValue( "title", e.target.value ) } 
        />
        <Columns>
            <AddButton onClick={ onClickCreate } isWaiting={ status.onRequest }/>
            <NullButton />
            <NullButton />
            <NullButton />
        </Columns>

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

function UpdateMapForm( { map, onClose } ) {

    const { getValue, setValue, status, setStatus, message, closeMessage } = useUpdateMap( { map, onClose } );

    const onClickUpdate = () => setStatus( { triggeredFlow: true } );
    const onClickClose = onClose;
    const onClickCancel = onClose;

    return (
        <Modal>
        <Form disabled={ status.onRequest }>
            <MapTitle onClickClose={ onClickClose } />
            <MapFields getValue={ getValue } setValue={ setValue } />
            <UpdateMapButtons onClickUpdate={ onClickUpdate } onClickCancel={ onClickCancel } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </Modal>
    );
}

function DeleteMapForm( { map, onClose } ) {

    const { getValue, status, setStatus, message, closeMessage } = useDeleteMap( { map, onClose } );

    const onClickDelete = () => setStatus( { onFlow: true } );

    return (
        <Modal>
        <Form disabled={ status.onRequest }>
            <MapTitle onClickClose={ onClose } />
            <MapFields getValue={ getValue } />
            <DeleteMapButtons onClickDelete={ onClickDelete } onClickCancel={ onClose } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </Modal>
    );
}

function MapTitle( { onClickClose } ) {

    return (
        <Title onClickClose={ onClickClose } >
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
                    onChange={ setValue ? e => setValue( "title", e.target.value ) : null }
                />
            </Field>
            <Field>
                <Text>Description</Text>
                <TextareaInput
                    rows="8"
                    maxLength="2000"
                    value={ getValue( "description" ) }
                    onChange={ setValue ? e => setValue( "description", e.target.value ) : null }
                />
            </Field>
            <Field>
                <Text>Published</Text>
                <CheckPublishedInput
                    value={ getValue( "published" ) }
                    onChange={ setValue ? e => setValue( "published", e.target.checked ) : null }
                />
            </Field>
        </Fields>
    );
}

function UpdateMapButtons( { onClickUpdate, onClickCancel, status } ) {

    return (
        <Buttons>
            <UpdateButton onClick={ onClickUpdate } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

function DeleteMapButtons( { onClickDelete, onClickCancel, status } ) {

    return (
        <Buttons>
            <DeleteButton onClick={ onClickDelete } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

export { CreateMapForm, UpdateMapForm, DeleteMapForm };