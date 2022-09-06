import { useEffect } from "react";
import { useFlow } from "../../commons/logic/useFlow";

const onValidationError = ( validation, onError, setStatus ) => {
    if ( validation.current.error ) {
        onError( validation.current.error );
        setStatus( {} );
        return true;
    }
    return false;
}

const onRequestError = ( request, onError, setStatus ) => {
    if ( request.current.error ) {
        onError( request.current.error );
        setStatus( {} );
        return true;
    }
    return false;
}

function useCreateMapFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {

        const { values, validation, onValidate, request, onPostRequest, onCreate, onError } = assets.current;
    
        if ( status.onClickCreate ) {
            onValidate();

        } else if ( status.afterValidation ) {
            if ( ! onValidationError( validation, onError, setStatus ) ) {
                const map = values.current;
                onPostRequest( map );
            }

        } else if ( status.afterRequest ) {
            if ( ! onRequestError( request, onError, setStatus ) ) {
                onCreate();
            }

        } else if ( status.afterUpdate ) {
            setStatus( {} );
        }

    }, [ status, setStatus, assets ] );

    return { ...inherited };
}

function useUpdateMapFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {

        const { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } = assets.current;
    
        if ( status.onClickUpdate ) {
            onValidate();

        } else if ( status.afterValidation ) {
            if ( ! onValidationError( validation, onError, setStatus ) ) {
                const map = values.current;
                onPutRequest( map );
            }

        } else if ( status.afterRequest ) {
            if ( ! onRequestError( request, onError, setStatus ) ) {
                onUpdate();
            }

        } else if ( status.afterUpdate ) {
            onClose();
            setStatus( {} );
        }

    }, [ status, setStatus, assets ] );

    return { ...inherited };
}

function useDeleteMapFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {

        const { values, request, onDeleteRequest, onDelete, onError, onClose } = assets.current;
    
        if ( status.onClickDelete ) {
            const map = values.current;
            onDeleteRequest( map );

        } else if ( status.afterRequest ) {
            if ( ! onRequestError( request, onError, setStatus ) ) {
                onDelete();
            }

        } else if ( status.afterDelete ) {
            onClose();
            setStatus( {} );
        }

    }, [ status, setStatus, assets ] );

    return { ...inherited };
}

export { useCreateMapFlow, useUpdateMapFlow, useDeleteMapFlow };