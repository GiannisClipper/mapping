import { useCreateForm, useUpdateForm, useDeleteForm } from "../_templates/logic/useForm";
import { useUserValidation } from "./logic/useUserValidation";
import { useUserRequest } from "./logic/useUserRequest";
import { useUserResponse } from "./logic/useUserResponse";
import { CreateForm, UpdateForm, DeleteForm } from "../_templates/Form";
import { Fields, Field } from "../_commons/Form";
import { Text } from "../_commons/Text";
import { Input, TextareaInput, CheckUserTypeInput } from "../_commons/Input";

function CreateUserForm( { user, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickCreate, onClickCancel, onClickClose, 
        status 
    } = useCreateForm( {
        schema: user,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse,
        onFinish: closeForm
    } );

    return (
        <CreateForm
            title="Create user"
            status={ status }
            onClickCreate={ onClickCreate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <UserFields getValue={ getValue } setValue={ setValue } />
        </CreateForm>
    );
}

function UpdateUserForm( { user, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickUpdate, onClickCancel, onClickClose, 
        status 
    } = useUpdateForm( {
        schema: user,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse,
        onFinish: closeForm
    } );

    return (
        <UpdateForm
            title="Update user"
            status={ status }
            onClickUpdate={ onClickUpdate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <UserFields getValue={ getValue } setValue={ setValue } />
        </UpdateForm>
    );
}

function DeleteUserForm( { user, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, 
        onClickDelete, onClickCancel, onClickClose, 
        status 
    } = useDeleteForm( {
        schema: user,
        useValidation: useUserValidation,
        useRequest: useUserRequest,
        useResponse: useUserResponse,
        onFinish: closeForm
    } );

    return (
        <DeleteForm
            title="Delete user"
            status={ status }
            onClickDelete={ onClickDelete }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <UserFields getValue={ getValue } />
        </DeleteForm>
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

export { CreateUserForm, UpdateUserForm, DeleteUserForm };