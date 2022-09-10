import { useRequest } from "../../_commons/logic/useRequest";

function useUserRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = ( { values } ) => {
        setRequest( {
            url: `/user`,
            options: { method: "POST", body: values.changeable },
            success: null,
            error: null,
        } );
    }

    const onPutRequest = ( { values } ) => {
        setRequest( {
            url: `/user/${values.changeable.id}`,
            options: { method: "PUT", body: values.changeable },
            success: null,
            error: null,
        } );
    }

    const onDeleteRequest = ( { values } ) => {
        setRequest( {
            url: `/user/${values.changeable.id}`,
            options: { method: "DELETE", body: {} },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest, onPutRequest, onDeleteRequest };
}

export { useUserRequest };