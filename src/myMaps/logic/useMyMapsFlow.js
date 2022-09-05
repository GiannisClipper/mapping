import { useEffect } from "react";
import { useFlow } from "../../commons/logic/useFlow";

function useMyMapsFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {

        const { values, request, onGetRequest, onRetrieve, onError } = assets.current;

        if ( status.autoRetrieve ) {
            onGetRequest( values.current.user_id );

        } else if ( status.afterRequest ) {
            if ( request.current.error ) {
                onError( request.current.error );
            } else {
                onRetrieve( request.current.success );
            }
            setStatus( {} );
        }
    
    }, [ status, setStatus, assets ] );

    return { ...inherited }
}

export { useMyMapsFlow };