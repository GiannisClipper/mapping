import { Buttons } from "../_commons/Form";
import { CreateButton, UpdateButton, DeleteButton, CancelButton } from "../_commons/Button";

function CreateButtons( { onClickCreate, onClickCancel, status } ) {

    return (
        <Buttons>
            <CreateButton onClick={ onClickCreate } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

function UpdateButtons( { onClickUpdate, onClickCancel, status } ) {

    return (
        <Buttons>
            <UpdateButton onClick={ onClickUpdate } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

function DeleteButtons( { onClickDelete, onClickCancel, status } ) {

    return (
        <Buttons>
            <DeleteButton onClick={ onClickDelete } isWaiting={ status.onRequest } />
            <CancelButton onClick={ onClickCancel } />
        </Buttons>
    );
}

export { CreateButtons, UpdateButtons, DeleteButtons };