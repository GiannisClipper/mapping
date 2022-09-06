import { useRequest } from "../../commons/logic/useRequest";

function useMapRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = map => {
        setRequest( {
            url: `/map`,
            options: { method: "POST", body: map },
            success: null,
            error: null,
        } );
    }

    const onPutRequest = map => {
        setRequest( {
            url: `/map/${map.id}`,
            options: { method: "PUT", body: map },
            success: null,
            error: null,
        } );
    }

    const onDeleteRequest = map => {
        setRequest( {
            url: `/map/${map.id}`,
            options: { method: "DELETE", body: {} },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest, onPutRequest, onDeleteRequest };
}

export { useMapRequest };