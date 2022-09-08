import { useRequest } from "../../commons/logic/useRequest";

function useMapRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = payload => {
        setRequest( {
            url: `/map`,
            options: { method: "POST", body: payload },
            success: null,
            error: null,
        } );
    }

    const onPutRequest = payload => {
        setRequest( {
            url: `/map/${payload.id}`,
            options: { method: "PUT", body: payload },
            success: null,
            error: null,
        } );
    }

    const onDeleteRequest = payload => {
        setRequest( {
            url: `/map/${payload.id}`,
            options: { method: "DELETE", body: {} },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest, onPutRequest, onDeleteRequest };
}

export { useMapRequest };