import { useState, useRef, useEffect, useCallback } from "react";

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
        values, setValues, resetValues,
        validation, onValidate, 
        request, onRequest, onResponse, 
        onError, onComplete, onFinish, 
        status, setStatus 
    } = props;

    if ( status.triggeredFlow ) {
        onValidate( { values } );

    } else if ( status.afterValidation ) {
        if ( ! onValidationError( validation, onError, setStatus ) ) {
            onRequest( { values } );
        }

    } else if ( status.afterRequest ) {
        if ( ! onRequestError( request, onError, setStatus ) ) {
            onResponse( { request, values, setValues, resetValues } );
        }

    } else if ( status.afterResponse ) {
        onComplete && onComplete();
        onFinish && onFinish();
        setStatus( {} );
    }
}

function useFlow( initialStatus ) {

    const [ status, setStatus ] = useState( initialStatus || {} );

    const flowAssets = useRef( {
        values: {},
        setValues: null,
        resetValues: null,
        validation: { current: {} },
        onValidate: () => setStatus( { afterValidation: true } ),
        request: { current: {} },
        onRequest: () => setStatus( { afterRequest: true } ),
        onResponse: () => setStatus( { afterResponse: true } ),
        onError: console.log,
        onComplete: null,
        onFinish: null,
    } );

    const setFlowAssets = useCallback( assets => flowAssets.current = { ...flowAssets.current, ...assets }, [] );

    useEffect( () => flow( { ...flowAssets.current, status, setStatus } ), [ flowAssets, status, setStatus ] );

    return { status, setStatus, flowAssets, setFlowAssets };
}

function useCreateFlow( { useValidation, useRequest, useResponse, onError, ...restAssets } ) {

    useValidation = useValidation || useMockValidation;
    useRequest = useRequest || useMockRequest;
    onError = onError || console.log;

    const inherited = useFlow();
    const { status, setStatus, setFlowAssets } = inherited;

    const { validation, onCreateValidate: onValidate } = useValidation( { setStatus } );
    const { request, onPostRequest: onRequest } = useRequest( { status, setStatus } );
    const { onPostResponse: onResponse } = useResponse( { setStatus } );

    useEffect( () => { setFlowAssets( { 
        validation, onValidate, request, onRequest, onResponse, onError, ...restAssets
    } ) }, [ 
        setFlowAssets, validation, onValidate, request, onRequest, onResponse, onError, restAssets
    ] );

    return inherited;
}

function useUpdateFlow( { useValidation, useRequest, useResponse, onError, ...restAssets } ) {

    useValidation = useValidation || useMockValidation;
    useRequest = useRequest || useMockRequest;
    onError = onError || console.log;

    const inherited = useFlow();
    const { status, setStatus, setFlowAssets } = inherited;

    const { validation, onUpdateValidate: onValidate } = useValidation( { setStatus } );
    const { request, onPutRequest: onRequest } = useRequest( { status, setStatus } );
    const { onPutResponse: onResponse } = useResponse( { setStatus } );

    useEffect( () => { setFlowAssets( { 
        validation, onValidate, request, onRequest, onResponse, onError, ...restAssets
    } ) }, [ 
        setFlowAssets, validation, onValidate, request, onRequest, onResponse, onError, restAssets
    ] );

    return inherited;
}

function useRetrieveFlow( { useValidation, useRequest, useResponse, onError, initialStatus, ...restAssets } ) {

    useValidation = useValidation || useMockValidation;
    useRequest = useRequest || useMockRequest;
    onError = onError || console.log;

    const inherited = useFlow( initialStatus );
    const { status, setStatus, setFlowAssets } = inherited;

    const { validation, onRetrieveValidate: onValidate } = useValidation( { setStatus } );
    const { request, onGetRequest: onRequest } = useRequest( { status, setStatus } );
    const { onGetResponse: onResponse } = useResponse( { setStatus } );

    useEffect( () => { setFlowAssets( { 
        validation, onValidate, request, onRequest, onResponse, onError, ...restAssets    
    } ) }, [ 
        setFlowAssets, validation, onValidate, request, onRequest, onResponse, onError, restAssets
    ] );

    return inherited;
}

function useDeleteFlow( { useValidation, useRequest, useResponse, onError, ...restAssets } ) {

    useValidation = useValidation || useMockValidation;
    useRequest = useRequest || useMockRequest;
    onError = onError || console.log;

    const inherited = useFlow();
    const { status, setStatus, setFlowAssets } = inherited;

    const { validation, onDeleteValidate: onValidate } = useValidation( { setStatus } );
    const { request, onDeleteRequest: onRequest } = useRequest( { status, setStatus } );
    const { onDeleteResponse: onResponse } = useResponse( { setStatus } );

    useEffect( () => { setFlowAssets( { 
            validation, onValidate, request, onRequest, onResponse, onError, ...restAssets
    } ) }, [ 
        setFlowAssets, validation, onValidate, request, onRequest, onResponse, onError, restAssets
    ] );

    return inherited;
}

export { useCreateFlow, useUpdateFlow, useRetrieveFlow, useDeleteFlow };