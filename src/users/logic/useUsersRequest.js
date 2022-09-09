import { useRequest } from "../../_commons/logic/useRequest";

function useUsersRequest( { status, setStatus, values } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onGetRequest = ( { values } ) => {
        setRequest( {
            url: `/users`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onGetRequest };
}

export { useUsersRequest };