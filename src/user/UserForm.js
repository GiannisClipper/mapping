import { useCreateFlow, useUpdateFlow, useDeleteFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { useUserValidation } from "./logic/useUserValidation";
import { useUserRequest } from "./logic/useUserRequest";
import { useUserResponse } from "./logic/useUserResponse";
import { useMessage } from "../_commons/logic/useMessage";
import { Modal } from "../_commons/Modal";
import { Form, Title, Fields, Field, Buttons } from "../_commons/Form";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { NullIcon } from "../_commons/Icon";
import { Input, TextareaInput, CheckUserTypeInput } from "../_commons/Input";
import { AddButton, NullButton, CancelButton, UpdateButton, DeleteButton } from "../_commons/Button";
import { Message } from "../_commons/Message";

function CreateUserForm( { user } ) {

    const { values, getValue, setValue, resetValues } = useValues( user );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useCreateFlow( {
        values,
        resetValues,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse, 
        onError: openMessage,
    } );

    const onClickCreate = () => setStatus( { triggeredFlow: true } );

    return (
        <>
        <NullIcon />
        <Input
            placeholder="Create new user..."
            value={ getValue( "title" ) }
            onChange={ e => setValue( "title", e.target.value ) } 
        />
        <Columns>
            <AddButton onClick={ onClickCreate } isWaiting={ status.onRequest }/>
            <NullButton />
            <NullButton />
        </Columns>

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

function UpdateUserForm( { user, onClose } ) {

    const { values, getValue, setValue, resetValues } = useValues( user );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useUpdateFlow( {
        values,
        resetValues,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse, 
        onError: openMessage,
        onClose
    } );

    const onClickUpdate = () => setStatus( { triggeredFlow: true } );
    const onClickClose = onClose;
    const onClickCancel = onClose;

    return (
        <Modal>
        <Form disabled={ status.onRequest }>
            <UserTitle onClickClose={ onClickClose } />
            <UserFields getValue={ getValue } setValue={ setValue } />
            <UpdateUserButtons onClickUpdate={ onClickUpdate } onClickCancel={ onClickCancel } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </Modal>
    );
}

function DeleteUserForm( { user, onClose } ) {

    const { values, getValue, resetValues } = useValues( user );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useDeleteFlow( {
        values,
        resetValues,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse, 
        onError: openMessage,
        onClose
    } );

    const onClickDelete = () => setStatus( { triggeredFlow: true } );

    return (
        <Modal>
        <Form disabled={ status.onRequest }>
            <UserTitle onClickClose={ onClose } />
            <UserFields getValue={ getValue } />
            <DeleteUserButtons onClickDelete={ onClickDelete } onClickCancel={ onClose } status={ status } />
        </Form>
        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </Modal>
    );
}

function UserTitle( { onClickClose } ) {

    return (
        <Title onClickClose={ onClickClose } >
            User form
        </Title>
    );
}

function UserFields( { getValue, setValue } ) {

    return (
        <Fields>
            <Field>
                <Text>Username</Text>
                <Input 
                    value={ getValue( "username" ) }
                    onChange={ setValue ? e => setValue( "username", e.target.value ) : null }
                />
            </Field>
            <Field>
                <Text>Password</Text>
                <Input 
                    value={ getValue( "password" ) }
                    onChange={ setValue ? e => setValue( "password", e.target.value ) : null }
                />
            </Field>
            <Field>
                <Text>Profile</Text>
                <TextareaInput
                    rows="8"
                    maxLength="2000"
                    value={ getValue( "profile" ) }
                    onChange={ setValue ? e => setValue( "profile", e.target.value ) : null }
                />
            </Field>
            <Field>
                <Text>Type</Text>
                <CheckUserTypeInput
                    value={ getValue( "type" ) === "ADMIN" }
                    onChange={ setValue ? e => setValue( "type", e.target.checked ? "ADMIN" : "USER" ) : null }
                />
            </Field>
        </Fields>
    );
}

function UpdateUserButtons( { onClickUpdate, onClickCancel, status } ) {

    return (
        <Buttons>
            <UpdateButton onClick={ onClickUpdate } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

function DeleteUserButtons( { onClickDelete, onClickCancel, status } ) {

    return (
        <Buttons>
            <DeleteButton onClick={ onClickDelete } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

export { CreateUserForm, UpdateUserForm, DeleteUserForm };