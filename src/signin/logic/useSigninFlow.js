import { useEffect } from "react";
import { useFlow, onValidationError, onRequestError } from "../../_commons/logic/useFlow";

function useSigninFlow() {

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

export { useSigninFlow };