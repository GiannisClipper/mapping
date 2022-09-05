import { useEffect } from "react";
import { useFlow } from "../../commons/logic/useFlow";

function useMapFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {

        const { values, validation, onValidate, request, onPutRequest, onUpdate, onError, onClose } = assets.current;

        const onValidationError = () => {
            if ( validation.current.error ) {
                onError( validation.current.error );
                setStatus( {} );
                return true;
            }
            return false;
        }

        const onRequestError = () => {
            if ( request.current.error ) {
                onError( request.current.error );
                setStatus( {} );
                return true;
            }
            return false;
        }
    
        if ( status.clickUpdate ) {
            onValidate();

        } else if ( status.afterValidation ) {
            if ( ! onValidationError() ) {
                const map = values.current;
                onPutRequest( map );
            }

        } else if ( status.afterRequest ) {
            if ( ! onRequestError() ) {
                onUpdate();
            }

        } else if ( status.afterUpdate ) {
            onClose();
            setStatus( {} );
        }
    
    }, [ status, setStatus, assets ] );

    return { ...inherited }
}

export { useMapFlow };