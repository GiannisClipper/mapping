import { useContext } from "react"; 
import { SearchContext } from "../SearchContext";

function useSearchResponse( { setStatus } ) {

    const { setMaps } = useContext( SearchContext );

    const onRetrieve = ( { values, request } ) => {
        setMaps( [ ...request.current.success ] );
        setStatus( { afterResponse: true } );
    };

    return { onRetrieve };
}

export { useSearchResponse };