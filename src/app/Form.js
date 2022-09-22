
import { Modal } from "../_commons/Modal";
import { Form, Title, UpdateButtons, DeleteButtons } from "../_commons/Form";
import { Message } from "../_commons/Message";

function MiniForm( { message, closeMessage, ...props } ) {

    return (
        <>
        { props.children /* specific fields and buttons */ }

        { message 
        ? <Message message={ message } close={ closeMessage } />
        : null 
        }
        </>
    );
}

function FullForm( { title, status, onClickClose, message, closeMessage, ...props } ) {

    return (
        <Modal>
            <Form disabled={ status.onRequest }>
                <Title onClickClose={ onClickClose }>
                    { title }
                </Title>

                { props.children /* specific fields and buttons */ }
            </Form>

            { message 
            ? <Message message={ message } close={ closeMessage } />            : null 
            }
        </Modal>
    );
}

function UpdateForm( { title, status, onClickUpdate, onClickCancel, onClickClose, message, closeMessage, ...props } ) {

    return (
        <FullForm
            title={ title }
            status={ status }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            { props.children /* specific fields */ }
            <UpdateButtons onClickUpdate={ onClickUpdate } onClickCancel={ onClickCancel } status={ status } />
        </FullForm>
    );
}

function DeleteForm( { title, status, onClickDelete, onClickCancel, onClickClose, message, closeMessage, ...props } ) {

    return (
        <FullForm
            title={ title }
            status={ status }
            onClickClose={ onClickClose }
            message={ message }
            closeMessage={ closeMessage }
        >
            { props.children /* specific fields */ }
            <DeleteButtons onClickDelete={ onClickDelete } onClickCancel={ onClickCancel } status={ status } />
        </FullForm>
    );
}

export { MiniForm, FullForm, UpdateForm, DeleteForm };