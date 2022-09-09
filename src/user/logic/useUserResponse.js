import { useContext } from "react"; 
import { UsersContext } from "../../users/UsersContext";

function useUserResponse( { setInitial, setStatus } ) {

    const { users, setUsers } = useContext( UsersContext );

    const onCreate = ( { values, request } ) => {

        setUsers( [ ...users, values.current ] );
        setInitial();
        setStatus( { afterResponse: true } );
    }

    const onUpdate = ( { values, request } ) => {

        for ( let i = 0; i < users.length; i++ ) {
            if ( users[ i ].id === values.initial.id ) {
                users[ i ] = { ...values.current };
                break;
            }
        }
        setUsers( [ ...users ] );
        setStatus( { afterResponse: true } );
    }

    const onDelete = ( { values, request } ) => {

        const newUsers = users.filter( user => user.id !== values.initial.id );
        setUsers( newUsers );
        setStatus( { afterResponse: true } );
    }

    return { onCreate, onUpdate, onDelete };
}

export { useUserResponse };