import { useRef, useEffect } from "react";
import { onMockRequest } from "../../_samples/mockApi";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
}

const wrappedFetch = async ( url, options ) => { 

    options = options ? options : {};
    options.method = options.method ? options.method : "GET";
    options.headers = options.headers ? { ...headers, ...options.headers } : headers;

    if ( options.method !== "GET" ) {
        options.body = options.body ? JSON.stringify( options.body ) : "{}";
    }

    const res = await fetch( url, options );
    return res;
}

const useRequest = ( { status, setStatus } ) => {

    const request = useRef( { url: "", options: {}, success: null, error: null } );

    const setRequest = req => { 
        request.current = req; 
        setStatus( { beforeRequest: true } );
    };

    useEffect( () => {

        const onRequest = async () => {
 
            wrappedFetch( request.current.url, request.current.options )   

            .then( response => {
                console.log( "Response: ", response );
                const { status, statusText } = response;
                if ( status !== 200 && status !== 201 ) {
                    throw new Error( `${status} ${statusText}` );
                }
                return response;
            } )

            .then( response => {
                return response.json();                    
            } )

            .then( success => {
                console.log( "Success: ", success );
                request.current.success = JSON.stringify( success );
                request.current.error = null;
                setStatus( { afterRequest: true } );
            } )    

            .catch( error => {
                console.log( "Error: ", error );
                request.current.error = error.message;
                request.current.success = null;
                setStatus( { afterRequest: true } );
            } )
        }

        if ( status.beforeRequest ) {
            setStatus( { onRequest: true } );
            // onRequest();
            setTimeout( () => onMockRequest( request, setStatus ), 750 );
        }
    }, [ request, setStatus, status ] );

    return { request, setRequest };
}

export { useRequest };