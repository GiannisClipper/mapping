import { useCreateForm, useUpdateForm, useDeleteForm } from "../app/logic/useForm";
import { useLineValidation } from "./logic/useLineValidation";
import { useLineResponse } from "./logic/useLineResponse";
import { newLineSchema } from "./logic/schema";
import { MiniForm, UpdateForm, DeleteForm } from "../app/Form";
import { Fields, Field } from "../_commons/Form";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { Input, TextareaInput } from "../_commons/Input";
import { AddButton } from "../_commons/Button";
import { Line as GeoLine } from "../geometry/line";

function CreateLineMiniForm() {

    const onFinish = () => {
        const geoPoint = GeoLine.instances.getLast();
        geoPoint.setFocus();
    }

    const { message, closeMessage, getValue, setValue, onClickCreate, status } = useCreateForm( {
        schema: newLineSchema(),
        useValidation: useLineValidation,
        useResponse: useLineResponse, 
        onFinish,
    } );

    return (
        <MiniForm
            message={ message }
            closeMessage={ closeMessage }
        >
            <Input
                placeholder="Create new..."
                value={ getValue( "title" ) }
                onChange={ e => setValue( "title", e.target.value ) } 
            />
            <Columns>
                <AddButton onClick={ onClickCreate } isWaiting={ status.onRequest }/>
            </Columns>
        </MiniForm>
    );
}

function UpdateLineForm( { line, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickUpdate, onClickCancel, onClickClose, 
        status 
    } = useUpdateForm( {
        schema: line,
        useValidation: useLineValidation,
        useResponse: useLineResponse,
        onFinish: closeForm
    } );

    return (
        <UpdateForm
            title="Update line"
            status={ status }
            onClickUpdate={ onClickUpdate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <LineFields getValue={ getValue } setValue={ setValue } />
        </UpdateForm>
    );
}

function DeleteLineForm( { line, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, 
        onClickDelete, onClickCancel, onClickClose, 
        status 
    } = useDeleteForm( {
        schema: line,
        useValidation: useLineValidation,
        useResponse: useLineResponse,
        onFinish: closeForm
    } );

    return (
        <DeleteForm
            title="Delete line"
            status={ status }
            onClickDelete={ onClickDelete }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <LineFields getValue={ getValue } />
        </DeleteForm>
    );
}

function LineFields( { getValue, setValue } ) {

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
        </Fields>
    );
}

export { CreateLineMiniForm, UpdateLineForm, DeleteLineForm };