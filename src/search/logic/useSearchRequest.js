import { useRequest } from "../../_commons/logic/useRequest";

function useSearchRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onGetRequest = ( { values } ) => {
        setRequest( {
            url: `/search/title/${values.current.title}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onGetRequest };
}

export { useSearchRequest };