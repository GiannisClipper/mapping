import samples from "./samples";
import { newMapSchema } from "../map/logic/schema";
import { newUserSchema } from "../user/logic/schema";
import { newProfileSchema } from "../profile/logic/schema";

const setLocalStorage = samples => localStorage.setItem( "mapping_samples", JSON.stringify( samples ) );
const getLocalStorage = () => {
    const item = localStorage.getItem( "mapping_samples" );
    return item
        ? JSON.parse( item )
        : samples;
}

function onMockRequest( request, setStatus ) {

    console.log( 'onMockRequest', request );

    const url = request.current.url;
    const method = request.current.options.method;
    const body = request.current.options.body;

    if ( url.startsWith( "/search/title/" ) ) {
        const samples = getLocalStorage();
        let tmp = url.split( "/" );
        const title = tmp[ tmp.length -1 ];
        const result = samples.maps.filter( map => map.title.includes( title ) );
        result.forEach( map => map.username = samples.users.filter( user => user.id === map.user_id )[ 0 ].username );
        request.current.success = result;
        request.current.error = null;

    } else if ( url === "/signin" ) {
        if ( method === "POST" ) {
            const samples = getLocalStorage();
            const { username, password } = body;
            const result = samples.users.filter( user => user.username === username && user.password === password );
            if ( result.length > 0 ) {
                const { id: user_id, type: user_type, username } = result[ 0 ];
                request.current.success = { user_id, user_type, username };
                setLocalStorage( samples );
            } else {
                request.current.error = "Invalid credentials."
            }
        }

    } else if ( url.startsWith( "/myMaps/user/" ) ) {
        const samples = getLocalStorage();
        const tmp = url.split( "/" );
        const user_id = tmp[ tmp.length -1 ];
        request.current.success = samples.maps.filter( map => map.user_id === user_id );
        request.current.error = null;

    } else if ( url.startsWith( "/map" ) ) {
        const tmp = url.split( "/" );
        const map_id = tmp[ tmp.length -1 ];

        if ( method === "POST" ) {
            const samples = getLocalStorage();
            samples.maps.push( { ...body } );
            setLocalStorage( samples );
        }

        if ( method === "PUT" ) {
            const samples = getLocalStorage();
            for ( let i = 0; i < samples.maps.length; i++ ) {
                if ( samples.maps[ i ].id === map_id ) {
                    samples.maps[ i ] = { ...body };
                    request.current.success = samples.maps[ i ];
                    setLocalStorage( samples );
                    break;
                }
            }
        }

        if ( method === "GET" ) {
            const samples = getLocalStorage();
            const tmp = url.split( "/" );
            const map_id = tmp[ tmp.length -1 ];
            const result = samples.maps.filter( map => map.id === map_id );
            request.current.success = newMapSchema( result[ 0 ] );
            request.current.error = null;
        }

        if ( method === "DELETE" ) {
            const samples = getLocalStorage();
            samples.maps = samples.maps.filter( map => map.id !== map_id );
            setLocalStorage( samples );
        }

    } else if ( url === "/users" ) {
        const samples = getLocalStorage();
        request.current.success = samples.users;
        request.current.error = null;

    } else if ( url.startsWith( "/user" ) ) {
        const tmp = url.split( "/" );
        const user_id = tmp[ tmp.length -1 ];

        if ( method === "POST" ) {
            const samples = getLocalStorage();
            samples.users.push( { ...body } );
            setLocalStorage( samples );
        }

        if ( method === "GET" ) {
            const samples = getLocalStorage();
            const result = samples.users.filter( user => user.id === user_id );
            request.current.success = newUserSchema( result[ 0 ] );
            request.current.error = null;
        }

        if ( method === "PUT" ) {
            const samples = getLocalStorage();
            for ( let i = 0; i < samples.users.length; i++ ) {
                if ( samples.users[ i ].id === user_id ) {
                    samples.users[ i ] = { ...body };
                    setLocalStorage( samples );
                    break;
                }
            }
        }

        if ( method === "DELETE" ) {
            const samples = getLocalStorage();
            samples.users = samples.users.filter( user => user.id !== user_id );
            setLocalStorage( samples );
        }

    } else if ( url.startsWith( "/profile" ) ) {
        const tmp = url.split( "/" );
        const user_id = tmp[ tmp.length -1 ];

        if ( method === "GET" ) {
            const samples = getLocalStorage();
            const result = samples.users.filter( user => user.id === user_id );
            request.current.success = newProfileSchema( result[ 0 ] );
            request.current.error = null;
        }

        if ( method === "PUT" ) {
            for ( let i = 0; i < samples.users.length; i++ ) {
                const samples = getLocalStorage();
                if ( samples.users[ i ].id === user_id ) {
                    samples.users[ i ] = { ...body };
                    setLocalStorage( samples );
                    break;
                }
            }
        }

    } else {
        request.current.success = null;
        request.current.error = "Invalid request.";
    }
    setStatus( { afterRequest: true } );
}

export { onMockRequest };