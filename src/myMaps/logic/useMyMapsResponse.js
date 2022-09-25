import { useContext } from "react"; 
import { MyMapsContext } from "../MyMapsContext";
import { AppContext } from "../../app/AppContext";

function useMyMapsResponse( { setStatus } ) {

    const { setMaps } = useContext( MyMapsContext );
    const { setMyMapsAutoRetrieve } = useContext( AppContext );

    const onGetResponse = ( { request, values, setValues, resetValues } ) => {

        setMaps( [ ...request.current.success ] );
        setMyMapsAutoRetrieve( false );
        setStatus( { afterResponse: true } );
    }

    return { onGetResponse };
}

export { useMyMapsResponse };