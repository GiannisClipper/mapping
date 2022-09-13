import { useState, useRef, useEffect } from "react";

function useMockValidation( { setStatus } ) { // to set validation optional

    return {
        validation: { current: {} },
        onCreateValidate: () => setStatus( { afterValidation: true } ),
        onUpdateValidate: () => setStatus( { afterValidation: true } ),
        onRetrieveValidate: () => setStatus( { afterValidation: true } ),
        onDeleteValidate: () => setStatus( { afterValidation: true } ),
    };
}

function useMockRequest( { setStatus } ) { // to set request optional

    return {
        request: { current: {} },
        onPostRequest: () => setStatus( { afterRequest: true } ),
        onPutRequest: () => setStatus( { afterRequest: true } ),
        onGetRequest: () => setStatus( { afterRequest: true } ),
        onDeleteRequest: () => setStatus( { afterRequest: true } ),
    };
}

const onValidationError = ( validation, onError, setStatus ) => {
    if ( validation.current.errors ) {
        onError( validation.current.errors );
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

const flow = props => {

    const { 
        values, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose, 
        status, setStatus 
    } = props;

    if ( status.triggeredFlow ) {
        onValidate();

    } else if ( status.afterValidation ) {
        if ( ! onValidationError( validation, onError, setStatus ) ) {
            onRequest( { values } );
        }

    } else if ( status.afterRequest ) {
        if ( ! onRequestError( request, onError, setStatus ) ) {
            onResponse( { values, request } );
        }

    } else if ( status.afterResponse ) {
        onClose();
        setStatus( {} );
    }
}

function useFlow() {

    const [ status, setStatus ] = useState( {} );

    const assets = useRef( {
        validation: { current: {} },
        onValidate: () => setStatus( { afterValidation: true } ),
        request: { current: {} },
        onRequest: () => setStatus( { afterRequest: true } ),
        onResponse: () => setStatus( { afterResponse: true } ),
        onError: console.log,
        onClose: () => {},
    } );

    const setAssets = passedAssets => assets.current = { ...assets.current, ...passedAssets };

    useEffect( () => flow( { ...assets.current, status, setStatus } ), [ assets, status, setStatus ] );

    return { status, setStatus, assets, setAssets };
}

function useCreateFlow( { values, resetValues, useValidation, useRequest, useResponse, onError, onClose } ) {

    useValidation = useValidation || useMockValidation; // validation is optional
    useRequest = useRequest || useMockRequest; // request is optional
    onError = onError || console.log;
    onClose = onClose || ( () => {} );

    const inherited = useFlow();
    const { status, setStatus, setAssets } = inherited;

    const { validation, onCreateValidate: onValidate } = useValidation( { values, setStatus } );
    const { request, onPostRequest: onRequest } = useRequest( { status, setStatus } );
    const { onPostResponse: onResponse } = useResponse( { resetValues, setStatus } );

    useEffect( () => { setAssets( { 
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    
    } ) }, [ setAssets,
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    ] );

    return inherited;
}

function useUpdateFlow( { values, resetValues, useValidation, useRequest, useResponse, onError, onClose } ) {

    useValidation = useValidation || useMockValidation; // validation is optional
    useRequest = useRequest || useMockRequest; // request is optional
    onError = onError || console.log;
    onClose = onClose || ( () => {} );

    const inherited = useFlow();
    const { status, setStatus, setAssets } = inherited;

    const { validation, onUpdateValidate: onValidate } = useValidation( { values, setStatus } );
    const { request, onPutRequest: onRequest } = useRequest( { status, setStatus } );
    const { onPutResponse: onResponse } = useResponse( { resetValues, setStatus } );

    useEffect( () => { setAssets( { 
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose

    } ) }, [ setAssets,
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    ] );

    return inherited;
}

function useRetrieveFlow( { values, resetValues, useValidation, useRequest, useResponse, onError, onClose } ) {

    useValidation = useValidation || useMockValidation; // validation is optional
    useRequest = useRequest || useMockRequest; // request is optional
    onError = onError || console.log;
    onClose = onClose || ( () => {} );

    const inherited = useFlow();
    const { status, setStatus, setAssets } = inherited;

    const { validation, onRetrieveValidate: onValidate } = useValidation( { values, setStatus } );
    const { request, onGetRequest: onRequest } = useRequest( { status, setStatus } );
    const { onGetResponse: onResponse } = useResponse( { resetValues, setStatus } );

    useEffect( () => { setAssets( { 
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    
    } ) }, [ setAssets,
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    ] );

    return inherited;
}

function useDeleteFlow( { values, resetValues, useValidation, useRequest, useResponse, onError, onClose } ) {

    useValidation = useValidation || useMockValidation; // validation is optional
    onError = onError || console.log;
    onClose = onClose || ( () => {} );

    const inherited = useFlow();
    const { status, setStatus, setAssets } = inherited;

    const { validation, onDeleteValidate: onValidate } = useValidation( { values, setStatus } );
    const { request, onDeleteRequest: onRequest } = useRequest( { status, setStatus } );
    const { onDeleteResponse: onResponse } = useResponse( { resetValues, setStatus } );

    useEffect( () => { setAssets( { 
            values, resetValues, validation, onValidate, 
            request, onRequest, onResponse, onError, onClose
    
    } ) }, [ setAssets,
        values, resetValues, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose
    ] );

    return inherited;
}

export { useCreateFlow, useUpdateFlow, useRetrieveFlow, useDeleteFlow };