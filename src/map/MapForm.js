import { Form, Title, Fields, Buttons } from "../commons/Form";

function MapTitle( { onClose } ) {

    return (
        <Title onClose={ onClose } >
            Map form
        </Title>
    );
}

function MapFields() {

    return (
        <Fields>
            <div>Field A:</div>
            <div>Field B:</div>
            <div>Field C:</div>
        </Fields>
    );
}

function MapButtons() {

    return (
    <Buttons>
        <div>[ Button OK ]</div>
        <div>[ Button Cancel ]</div>
    </Buttons>
    );
}

function MapForm( { onClose } ) {

    return (
        <Form>
            <MapTitle onClose={ onClose } />
            <MapFields />
            <MapButtons />
        </Form>
    );
}

export { MapForm };