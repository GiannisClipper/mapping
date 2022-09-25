import { useContext } from "react"; 
import { SearchContext } from "../SearchContext";

function useSearchResponse( { setStatus } ) {

    const { setMaps } = useContext( SearchContext );

    const onGetResponse = ( { request, values, setValues, resetValues } ) => {
        setMaps( [ ...request.current.success ] );
        setStatus( { afterResponse: true } );
    };

    return { onGetResponse };
}

export { useSearchResponse };