import { useRequest } from "../../_commons/logic/useRequest";

function useProfileRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPutRequest = ( { values } ) => {
        setRequest( {
            url: `/profile/${values.changeable.id}`,
            options: { method: "PUT", body: values.changeable },
            success: null,
            error: null,
        } );
    }

    const onGetRequest = ( { values } ) => {
        setRequest( {
            url: `/profile/${values.changeable.id}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPutRequest, onGetRequest };
}

export { useProfileRequest };