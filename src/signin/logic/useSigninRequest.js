import { useRequest } from "../../commons/logic/useRequest";

function useSigninRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onPostRequest = payload => {
        setRequest( {
            url: `/signin`,
            options: { method: "POST", body: payload },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onPostRequest };
}

export { useSigninRequest };