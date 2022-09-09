import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function useMapResponse( { setInitial, setStatus } ) {

    const { maps, setMaps } = useContext( MyMapsContext );

    const onCreate = ( { values, request } ) => {

        setMaps( [ ...maps, values.current ] );
        setInitial();
        setStatus( { afterResponse: true } );
    }

    const onUpdate = ( { values, request } ) => {

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].id === values.initial.id ) {
                maps[ i ] = { ...values.current };
                break;
            }
        }
        setMaps( [ ...maps ] );
        setStatus( { afterResponse: true } );
    }

    const onDelete = ( { values, request } ) => {

        const newMaps = maps.filter( map => map.id !== values.initial.id );
        setMaps( newMaps );
        setStatus( { afterResponse: true } );
    }

    return { onCreate, onUpdate, onDelete };
}

export { useMapResponse };