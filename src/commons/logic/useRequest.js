import { useRef, useEffect, useContext } from "react";
import { AppContext } from "../../app/AppContext";

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

    const { samples, setSamples } = useContext( AppContext );
    const request = useRef( { url: "", options: {}, success: null, error: null } );

    const setRequest = req => { 
        // console.log( "setRequest", req );
        request.current = req; 
        setStatus( { beforeRequest: true } );
    };

//    useEffect( () => console.log( 'status', status, request ) );
    useEffect( () => {

        const doRequest = async () => {

            console.log( 'doRequest', request );

            if ( request.current.url.startsWith( "/search/title/" ) ) {
                const tmp = request.current.url.split( "/" );
                const title = tmp[ tmp.length -1 ];
                // request.current.onSuccess( samples.maps.filter( map => map.title.includes( title ) ) );
                request.current.success = samples.maps.filter( map => map.title.includes( title ) );
                request.current.error = null;

            } else if ( request.current.url.startsWith( "/myMaps/user/" ) ) {
                const tmp = request.current.url.split( "/" );
                const user_id = tmp[ tmp.length -1 ];
                // request.current.onSuccess( samples.maps.filter( map => map.user_id === user_id ) );
                request.current.success = samples.maps.filter( map => map.user_id === user_id );
                request.current.error = null;

            } else if ( request.current.url.startsWith( "/map" ) ) {
                const tmp = request.current.url.split( "/" );
                const map_id = tmp[ tmp.length -1 ];

                if ( request.current.method === "POST" ) {
                    samples.maps.push( { ...request.current.options.body } );
                    setSamples( { ...samples } );
                }

                if ( request.current.method === "PUT" ) {
                    for ( let i = 0; i < samples.maps.length; i++ ) {
                        if ( samples.maps[ i ].id === map_id ) {
                            samples.maps[ i ] = { ...request.current.options.body };
                            break;
                        }
                    }
                    setSamples( { ...samples } );
                }

                if ( request.current.method === "DELETE" ) {
                    samples.maps = samples.maps.filter( map => map.id !== map_id );
                    setSamples( { ...samples } );
                }

            } else {
                request.current.success = null;
                request.current.error = "Invalid request.";
            }
            setStatus( { afterRequest: true } );
 
            // wrappedFetch( request.current.url, request.current.options )   

            // .then( response => {
            //     console.log( "Response: ", response );
            //     const { status, statusText } = response;
            //     if ( status !== 200 && status !== 201 ) {
            //         throw new Error( `${status} ${statusText}` );
            //     }
            //     return response;
            // } )

            // .then( response => {
            //     return response.json();                    
            // } )

            // .then( json => {
            //     console.log( "Data: ", json );
            //     //request.current.onSuccess( JSON.stringify( json ) );
            //     //setStatus( {} );
            //     request.current.success = JSON.stringify( json );
            //     request.current.error = null;
            //     setStatus( { afterRequest: true } );
 

            // } )    

            // .catch( error => {
            //     console.log( "Error: ", error );
            //     //request.current.onError( error.message );
            //     //setStatus( {} );
            //     request.current.error = error.message;
            //     request.current.success = null;
            //     setStatus( { afterRequest: true } );
 
            // } )
        }

        if ( status.beforeRequest ) {
            setStatus( { onRequest: true } );
            setTimeout( () => doRequest(), 750 );
        }
    }, [ request, samples, setSamples, setStatus, status ] );

    return { request, setRequest };
}

export { useRequest };