import { useCreateForm, useUpdateForm, useDeleteForm } from "../app/logic/useForm";
import { useMapValidation } from "./logic/useMapValidation";
import { useMapRequest } from "./logic/useMapRequest";
import { useMapResponse } from "./logic/useMapResponse";

import { MiniForm, UpdateForm, DeleteForm } from "../app/Form";
import { Fields, Field } from "../_commons/Form";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { NullIcon } from "../_commons/Icon";
import { Input, TextareaInput, CheckPublishedInput } from "../_commons/Input";
import { AddButton, NullButton } from "../_commons/Button";

function CreateMapMiniForm( { map } ) {

    const { message, closeMessage, getValue, setValue, onClickCreate, status } = useCreateForm( {
        schema: map,
        useValidation: useMapValidation,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
    } );

    return (
        <MiniForm
            message={ message }
            closeMessage={ closeMessage }
        >
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
        </MiniForm>
    );
}

function UpdateMapForm( { map, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickUpdate, onClickCancel, onClickClose, 
        status 
    } = useUpdateForm( {
        schema: map,
        useValidation: useMapValidation,
        useRequest: useMapRequest,
        useResponse: useMapResponse,
        onFinish: closeForm
    } );

    return (
        <UpdateForm
            title="Update map"
            status={ status }
            onClickUpdate={ onClickUpdate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <MapFields getValue={ getValue } setValue={ setValue } />
        </UpdateForm>
    );
}

function DeleteMapForm( { map, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, 
        onClickDelete, onClickCancel, onClickClose, 
        status 
    } = useDeleteForm( {
        schema: map,
        useValidation: useMapValidation,
        useRequest: useMapRequest,
        useResponse: useMapResponse,
        onFinish: closeForm
    } );

    return (
        <DeleteForm
            title="Delete map"
            status={ status }
            onClickDelete={ onClickDelete }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <MapFields getValue={ getValue } />
        </DeleteForm>
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

export { CreateMapMiniForm, UpdateMapForm, DeleteMapForm };