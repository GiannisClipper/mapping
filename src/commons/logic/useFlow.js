import { useState, useRef, useEffect } from "react";

function useFlow() {

    const [ status, setStatus ] = useState( {} );

    const assets = useRef( {
        values: { initial: {}, current: {} },
        validation: { current: {} },
        onValidate: () => setStatus( { afterValidation: true } ),
        request: { current: {} },
        onPostRequest: () => setStatus( { afterRequest: true } ),
        onPutRequest: () => setStatus( { afterRequest: true } ),
        onGetRequest: () => setStatus( { afterRequest: true } ),
        onDeleteRequest: () => setStatus( { afterRequest: true } ),
        onCreate: () => setStatus( { afterResponse: true } ),
        onUpdate: () => setStatus( { afterResponse: true } ),
        onRetrieve: () => setStatus( { afterResponse: true } ),
        onDelete: () => setStatus( { afterResponse: true } ),
        onClose: () => {},
    } );

    const setAssets = passval => assets.current = { ...assets.current, ...passval }; 

    return { status, setStatus, assets, setAssets };
}

const flow = props => {

    const { 
        values, validation, onValidate, 
        request, onRequest, onResponse, onError, onClose, 
        status, setStatus 
    } = props;

    if ( status.onFlow ) {
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

function useCreateFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {
        const { onPostRequest, onCreate } = assets.current;
        flow( { 
            ...assets.current, 
            onRequest: onPostRequest, 
            onResponse: onCreate, 
            status,
            setStatus 
        } );
    }, [ assets, status, setStatus ] );

    return { ...inherited };
}

function useRetrieveFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {
        const { onGetRequest, onRetrieve } = assets.current;
        flow( { 
            ...assets.current, 
            onRequest: onGetRequest, 
            onResponse: onRetrieve, 
            status, 
            setStatus 
        } );
    }, [ assets, status, setStatus ] );

    return { ...inherited };
}

function useUpdateFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {
        const { onPutRequest, onUpdate } = assets.current;
        flow( { 
            ...assets.current, 
            onRequest: onPutRequest, 
            onResponse: onUpdate, 
            status, 
            setStatus 
        } );
    }, [ assets, status, setStatus ] );

    return { ...inherited };
}

function useDeleteFlow() {

    const inherited = useFlow();
    const { status, setStatus, assets } = inherited;

    useEffect( () => {
        const { onDeleteRequest, onDelete } = assets.current;
        flow( { 
            ...assets.current, 
            onRequest: onDeleteRequest, 
            onResponse: onDelete, 
            status, 
            setStatus 
        } );
    }, [ assets, status, setStatus ] );

    return { ...inherited };
}

export { useCreateFlow, useRetrieveFlow, useUpdateFlow, useDeleteFlow };