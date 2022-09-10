import { useContext } from "react"; 
import { UsersContext } from "../../users/UsersContext";

function useUserResponse( { resetValues, setStatus } ) {

    const { users, setUsers } = useContext( UsersContext );

    const onPostResponse = ( { values, request } ) => {

        setUsers( [ ...users, values.changeable ] );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { values, request } ) => {

        for ( let i = 0; i < users.length; i++ ) {
            if ( users[ i ].id === values.initial.id ) {
                users[ i ] = { ...values.changeable };
                break;
            }
        }
        setUsers( [ ...users ] );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { values, request } ) => {

        const newUsers = users.filter( user => user.id !== values.initial.id );
        setUsers( newUsers );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useUserResponse };