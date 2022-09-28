import { Buttons } from "../_commons/Form";
import { SaveButton, TrashButton, CancelButton } from "../_commons/Button";
import { Text } from "../_commons/Text";

function CreateButtons( { onClickCreate, onClickCancel, status } ) {

    return (
        <Buttons>
            <SaveButton onClick={ onClickCreate } isWaiting={ status.onRequest }>
                <Text>Save</Text>
            </SaveButton>
            <CancelButton onClick={ onClickCancel }>
                <Text>Cancel</Text>
            </CancelButton>
        </Buttons>
    );
}

function UpdateButtons( { onClickUpdate, onClickCancel, status } ) {

    return (
        <Buttons>
            <SaveButton onClick={ onClickUpdate } isWaiting={ status.onRequest }>
                <Text>Save</Text>
            </SaveButton>
            <CancelButton onClick={ onClickCancel }>
                <Text>Cancel</Text>
            </CancelButton>
        </Buttons>
    );
}

function DeleteButtons( { onClickDelete, onClickCancel, status } ) {

    return (
        <Buttons>
            <TrashButton onClick={ onClickDelete } isWaiting={ status.onRequest }>
                <Text>Delete</Text>
            </TrashButton>
            <CancelButton onClick={ onClickCancel }>
                <Text>Cancel</Text>
            </CancelButton>
        </Buttons>
    );
}

export { CreateButtons, UpdateButtons, DeleteButtons };