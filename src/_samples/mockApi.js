import samples from "./samples";
import { newMapSchema } from "../map/logic/schema";

function onMockRequest( request, setStatus ) {

    console.log( 'onMockRequest', request );

    const url = request.current.url;
    const method = request.current.options.method;
    const body = request.current.options.body;

    if ( url.startsWith( "/search/title/" ) ) {
        let tmp = url.split( "/" );
        const title = tmp[ tmp.length -1 ];
        const result = samples.maps.filter( map => map.title.includes( title ) );
        result.forEach( map => map.username = samples.users.filter( user => user.id === map.user_id )[ 0 ].username );
        request.current.success = result;
        request.current.error = null;

    } else if ( url === "/signin" ) {
        if ( method === "POST" ) {
            const { username, password } = body;
            const result = samples.users.filter( user => user.username === username && user.password === password );
            if ( result.length > 0 ) {
                const { id: user_id, type: user_type, username } = result[ 0 ];
                request.current.success = { user_id, user_type, username };
            } else {
                request.current.error = "Invalid credentials."
            }
        }

    } else if ( url.startsWith( "/myMaps/user/" ) ) {
        const tmp = url.split( "/" );
        const user_id = tmp[ tmp.length -1 ];
        request.current.success = samples.maps.filter( map => map.user_id === user_id );
        request.current.error = null;

    } else if ( url.startsWith( "/map" ) ) {
        const tmp = url.split( "/" );
        const map_id = tmp[ tmp.length -1 ];

        if ( method === "POST" ) {
            samples.maps.push( { ...body } );
        }

        if ( method === "PUT" ) {
            for ( let i = 0; i < samples.maps.length; i++ ) {
                if ( samples.maps[ i ].id === map_id ) {
                    samples.maps[ i ] = { ...body };
                    request.current.success = samples.maps[ i ];
                    break;
                }
            }
        }

        if ( method === "GET" ) {
            const tmp = url.split( "/" );
            const map_id = tmp[ tmp.length -1 ];
            const result = samples.maps.filter( map => map.id === map_id );
            request.current.success = newMapSchema( result[ 0 ] );
            request.current.error = null;
        }

        if ( method === "DELETE" ) {
            samples.maps = samples.maps.filter( map => map.id !== map_id );
        }

    } else if ( url === "/users" ) {
        request.current.success = samples.users;
        request.current.error = null;

    } else if ( url.startsWith( "/user" ) ) {
        const tmp = url.split( "/" );
        const user_id = tmp[ tmp.length -1 ];

        if ( method === "POST" ) {
            samples.users.push( { ...body } );
        }

        if ( method === "PUT" ) {
            for ( let i = 0; i < samples.users.length; i++ ) {
                if ( samples.users[ i ].id === user_id ) {
                    samples.users[ i ] = { ...body };
                    break;
                }
            }
        }

        if ( method === "DELETE" ) {
            samples.users = samples.users.filter( user => user.id !== user_id );
        }

    } else {
        request.current.success = null;
        request.current.error = "Invalid request.";
    }
    setStatus( { afterRequest: true } );
}

export { onMockRequest };