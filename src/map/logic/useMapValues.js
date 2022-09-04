import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { useValues } from "../../commons/logic/useValues";

function useMapValues( { map, onError } ) {

    const { values, getValue, setValue, setInitialValues } = useValues( map );

    const { maps, setMaps } = useContext( MyMapsContext );

    const validateMap = () => {

        if ( ! values.current.title ) {
            onError( "Title should not be blank." );
            return false;
        }

        if ( values.initial.title !== values.current.title && maps.filter( map => map.title === values.current.title ).length > 0 ) {
            onError( `Title '${values.current.title}' already exists.` );
            return false;
        }

        return true;
    }

    const createMap = event => {

        if ( ! validateMap() ) {
            return false;
        }

        setMaps( [ ...maps, values.current ] );
        setInitialValues();
        return true;
    }

    const updateMap = event => {

        if ( ! validateMap() ) {
            return false;
        }

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].title === values.initial.title ) {
                maps[ i ] = { ...values.current };
                break;
            }
        }
        setMaps( [ ...maps ] );
        return true;
    }

    const deleteMap = event => {

        const newMaps = maps.filter( map => map.title !== values.initial.title );
        setMaps( newMaps );
    }

    return { getValue, setValue, createMap, updateMap, deleteMap };
}

export { useMapValues };