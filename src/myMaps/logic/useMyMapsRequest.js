import { useRequest } from "../../_commons/logic/useRequest";

function useMyMapsRequest( { status, setStatus, values } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onGetRequest = ( { values } ) => {
        setRequest( {
            url: `/myMaps/user/${values.current.user_id}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onGetRequest };
}

export { useMyMapsRequest };