import { useContext } from "react"; 
import { UsersContext } from "../UsersContext";
import { AppContext } from "../../app/AppContext";

function useUsersResponse( { setStatus } ) {

    const { setUsers } = useContext( UsersContext );
    const { setUsersAutoRetrieve } = useContext( AppContext );

    const onGetResponse = ( { request, values, setValues, resetValues } ) => {

        setUsers( [ ...request.current.success ] );
        setUsersAutoRetrieve( false );
        setStatus( { afterResponse: true } );
    }

    return { onGetResponse };
}

export { useUsersResponse };