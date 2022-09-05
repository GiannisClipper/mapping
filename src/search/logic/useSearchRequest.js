import { useRequest } from "../../commons/logic/useRequest";

function useSearchRequest( { status, setStatus } ) {

    const inherited = useRequest( { status, setStatus } );
    const { setRequest } = inherited;

    const onGetRequest = title => {
        setRequest( {
            url: `/search/title/${title}`,
            options: { method: "GET" },
            success: null,
            error: null,
        } );
    }

    return { ...inherited, onGetRequest };
}

export { useSearchRequest };