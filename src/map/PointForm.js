import { useCreateForm, useUpdateForm, useDeleteForm } from "../_templates/logic/useForm";
import { usePointValidation } from "./logic/usePointValidation";
import { usePointResponse } from "./logic/usePointResponse";
import { newPointSchema } from "./logic/schema";
import { MiniForm, UpdateForm, DeleteForm } from "../_templates/Form";
import { Fields, Field } from "../_commons/Form";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { Input, TextareaInput } from "../_commons/Input";
import { AddButton } from "../_commons/Button";
import { Point as GeoPoint } from "../geometry/point";

function CreatePointMiniForm() {

    const onComplete = () => {
        const geoPoint = GeoPoint.instances.getLast();
        geoPoint.setFocus();
    }

    const { message, closeMessage, getValue, setValue, onClickCreate, status } = useCreateForm( {
        schema: newPointSchema(),
        useValidation: usePointValidation,
        useResponse: usePointResponse, 
        onComplete
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

function UpdatePointForm( { point, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, setValue, 
        onClickUpdate, onClickCancel, onClickClose, 
        status 
    } = useUpdateForm( {
        schema: point,
        useValidation: usePointValidation,
        useResponse: usePointResponse,
        onFinish: closeForm
    } );

    return (
        <UpdateForm
            title="Update point"
            status={ status }
            onClickUpdate={ onClickUpdate }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <PointFields getValue={ getValue } setValue={ setValue } />
        </UpdateForm>
    );
}

function DeletePointForm( { point, closeForm } ) {

    const {
        message, closeMessage, 
        getValue, 
        onClickDelete, onClickCancel, onClickClose, 
        status 
    } = useDeleteForm( {
        schema: point,
        useValidation: usePointValidation,
        useResponse: usePointResponse,
        onFinish: closeForm
    } );

    return (
        <DeleteForm
            title="Delete point"
            status={ status }
            onClickDelete={ onClickDelete }
            onClickCancel={ onClickCancel }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            <PointFields getValue={ getValue } />
        </DeleteForm>
    );
}

function PointFields( { getValue, setValue } ) {

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

export { CreatePointMiniForm, UpdatePointForm, DeletePointForm };