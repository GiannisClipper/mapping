import { useUpdateForm } from "../_templates/logic/useForm";
import { useUserValidation } from "../user/logic/useUserValidation";
import { useProfileRequest } from "./logic/useProfileRequest";
import { useProfileResponse } from "./logic/useProfileResponse";
import { UpdateForm } from "../_templates/Form";
import { Fields, Field } from "../_commons/Form";
import { Text } from "../_commons/Text";
import { Input, TextareaInput } from "../_commons/Input";

function UpdateProfileForm( { user, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickUpdate, onClickCancel, onClickClose, 
        status 
    } = useUpdateForm( {
        schema: user,
        useValidation: useUserValidation,
        useRequest: useProfileRequest,
        useResponse: useProfileResponse,
        onFinish: closeForm
    } );

    return (
        <UpdateForm
            title="Update user profile"
            status={ status }
            onClickUpdate={ onClickUpdate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <ProfileFields getValue={ getValue } setValue={ setValue } />
        </UpdateForm>
    );
}

function ProfileFields( { getValue, setValue } ) {

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
        </Fields>
    );
}

export { UpdateProfileForm };