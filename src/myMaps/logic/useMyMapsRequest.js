import { useRequest } from "../../commons/logic/useRequest";

function useMyMapsRequest( { status, setStatus, values } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onGetRequest = user_id => {
        setRequest( {
            url: `/myMaps/user/${user_id}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onGetRequest };
}

export { useMyMapsRequest };