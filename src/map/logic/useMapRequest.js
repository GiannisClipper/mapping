import { useRequest } from "../../_commons/logic/useRequest";

function useMapRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = ( { values } ) => {
        setRequest( {
            url: `/map`,
            options: { method: "POST", body: values.changeable },
            success: null,
            error: null,
        } );
    }

    const onPutRequest = ( { values } ) => {
        setRequest( {
            url: `/map/${values.changeable.id}`,
            options: { method: "PUT", body: { ...values.changeable } },
            success: null,
            error: null,
        } );
    }

    const onGetRequest = ( { values } ) => {
        setRequest( {
            url: `/map/${values.changeable.id}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    const onDeleteRequest = ( { values } ) => {
        setRequest( {
            url: `/map/${values.changeable.id}`,
            options: { method: "DELETE", body: {} },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest, onPutRequest, onGetRequest, onDeleteRequest };
}

export { useMapRequest };