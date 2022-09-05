import { useRequest } from "../../commons/logic/useRequest";

function useMapRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPutRequest = map => {

        setRequest( {
            url: `/map/${map.id}`,
            options: { method: "PUT", body: map },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPutRequest };
}

export { useMapRequest };