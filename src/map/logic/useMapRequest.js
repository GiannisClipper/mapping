import { useRequest } from "../../_commons/logic/useRequest";

function useMapRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = ( { values } ) => {
        setRequest( {
            url: `/map`,
            options: { method: "POST", body: values.current },
            success: null,
            error: null,
        } );
    }

    const onPutRequest = ( { values } ) => {
        setRequest( {
            url: `/map/${values.current.id}`,
            options: { method: "PUT", body: values.current },
            success: null,
            error: null,
        } );
    }

    const onDeleteRequest = ( { values } ) => {
        setRequest( {
            url: `/map/${values.current.id}`,
            options: { method: "DELETE", body: {} },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest, onPutRequest, onDeleteRequest };
}

export { useMapRequest };