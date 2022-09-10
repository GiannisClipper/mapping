import { useRequest } from "../../_commons/logic/useRequest";

function useSigninRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = ( { values } ) => {
        setRequest( {
            url: `/signin`,
            options: { method: "POST", body: values.changeable },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest };
}

export { useSigninRequest };