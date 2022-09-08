import { useContext } from "react"; 
import { MyMapsContext } from "../MyMapsContext";
import { AppContext } from "../../app/AppContext";

function useMyMapsResponse( { setStatus } ) {

    const { setMaps } = useContext( MyMapsContext );
    const { setMyMapsAutoRetrieve } = useContext( AppContext );

    const onRetrieve = ( { values, request } ) => {

        setMaps( [ ...request.current.success ] );
        setMyMapsAutoRetrieve( false );
        setStatus( { afterResponse: true } );
    }

    return { onRetrieve };
}

export { useMyMapsResponse };