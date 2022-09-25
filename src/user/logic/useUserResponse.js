import { useContext } from "react"; 
import { UsersContext } from "../../users/UsersContext";

function useUserResponse( { setStatus } ) {

    const { users, setUsers } = useContext( UsersContext );

    const onPostResponse = ( { request, values, setValues, resetValues } ) => {

        setUsers( [ ...users, values.changeable ] );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { request, values, setValues, resetValues } ) => {

        for ( let i = 0; i < users.length; i++ ) {
            if ( users[ i ].id === values.initial.id ) {
                users[ i ] = { ...values.changeable };
                break;
            }
        }
        setUsers( [ ...users ] );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { request, values, setValues, resetValues } ) => {

        const newUsers = users.filter( user => user.id !== values.initial.id );
        setUsers( newUsers );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onDeleteResponse };
}

export { useUserResponse };