import { useState, useEffect } from "react";

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

const useRequest = ( { onSuccess, onError } ) => {

    const [ request, _setRequest ] = useState( { url: "", options: {} } );

    const [ status, setStatus ] = useState( {} );

    const setRequest = request => { 
        _setRequest( request ); 
        setStatus( { isAvailable: true } ) 
    };

    useEffect( () => {

        const doRequest = async () => {

            wrappedFetch( request.url, request.options )   

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

            .then( json => {
                onSuccess( JSON.stringify( json ) );
                setStatus( {} );
            } )    

            .catch( error => {
                console.log( "Error: ", error );
                onError( error.message );
                setStatus( {} );
            } )
        }

        if ( status.isAvailable ) {
            setStatus( { isRequesting: true } );
            setTimeout( () => doRequest(), 1500 );
        }
    }, [ status, request, onSuccess, onError ] );

    return { status, setRequest };
}

export { useRequest };