import { useContext } from "react"; 
import { SearchContext } from "../SearchContext";

function useSearchResponse( { setStatus } ) {

    const { setMaps } = useContext( SearchContext );

    const onGetResponse = ( { values, request } ) => {
        setMaps( [ ...request.current.success ] );
        setStatus( { afterResponse: true } );
    };

    return { onGetResponse };
}

export { useSearchResponse };