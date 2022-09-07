import samples from "./samples";

function onMockRequest( request, setStatus ) {

    console.log( 'onMockRequest', request );

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
            // setSamples( { ...samples } );
        }

        if ( request.current.method === "PUT" ) {
            for ( let i = 0; i < samples.maps.length; i++ ) {
                if ( samples.maps[ i ].id === map_id ) {
                    samples.maps[ i ] = { ...request.current.options.body };
                    break;
                }
            }
            // setSamples( { ...samples } );
        }

        if ( request.current.method === "DELETE" ) {
            samples.maps = samples.maps.filter( map => map.id !== map_id );
            // setSamples( { ...samples } );
        }

    } else {
        request.current.success = null;
        request.current.error = "Invalid request.";
    }
    setStatus( { afterRequest: true } );
}

export { onMockRequest };