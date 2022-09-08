import { useCreateMap, useUpdateMap, useDeleteMap } from "./logic/useMap";
import { Form, Title, Fields, Field, Buttons } from "../commons/Form";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Text";
import { NullIcon } from "../commons/Icon";
import { Input, TextareaInput, CheckPublishedInput } from "../commons/Input";
import { AddButton, NullButton, CancelButton, UpdateButton, DeleteButton } from "../commons/Button";
import { Message } from "../commons/Message";

function CreateMapForm( { map, onClose } ) {

    const { getValue, setValue, setStatus, message, closeMessage } = useCreateMap( { map, onClose } );

    const onClickCreate = () => setStatus( { onClickCreate: true } );

    return (
        <>
        <NullIcon />
        <Input
            placeholder="Create new map..."
            value={ getValue( "title" ) }
            onChange={ e => setValue( "title", e.target.value ) } 
        />
        <Columns>
            <AddButton onClick={ onClickCreate }/>
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

    const disabledOrNot = status.onRequest ? "disabled" : "";
    const onClickUpdate = () => setStatus( { onClickUpdate: true } );
    const onClickClose = onClose;
    const onClickCancel = onClose;

    return (
        <>
        <Form className={ disabledOrNot }>
            <MapTitle onClickClose={ onClickClose } />
            <MapFields getValue={ getValue } setValue={ setValue } />
            <UpdateMapButtons onClickUpdate={ onClickUpdate } onClickCancel={ onClickCancel } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

function DeleteMapForm( { map, onClose } ) {

    const { getValue, status, setStatus, message, closeMessage } = useDeleteMap( { map, onClose } );

    const disabledOrNot = status.onRequest ? "disabled" : "";
    const onClickDelete = () => setStatus( { onClickDelete: true } );

    return (
        <>
        <Form className={ disabledOrNot }>
            <MapTitle onClickClose={ onClose } />
            <MapFields getValue={ getValue } />
            <DeleteMapButtons onClickDelete={ onClickDelete } onClickCancel={ onClose } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
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