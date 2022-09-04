import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { useValues } from "../../commons/logic/form";

function useMapForm( { map, onError } ) {

    const { maps, setMaps } = useContext( MyMapsContext );

    const { values, getValue, setValue } = useValues( map );

    const validateMap = () => {

        if ( ! values.onForm.title ) {
            onError( "Title should not be blank." );
            return false;
        }

        if ( values.inStorage.title !== values.onForm.title && maps.filter( map => map.title === values.onForm.title ).length > 0 ) {
            onError( `Title '${values.onForm.title}' already exists.` );
            return false;
        }

        return true;
    }

    const createMap = event => {

        if ( ! validateMap() ) {
            return false;
        }

        setMaps( [ ...maps, values.onForm ] );
        return true;
    }

    const updateMap = event => {

        if ( ! validateMap() ) {
            return false;
        }

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].title === values.inStorage.title ) {
                maps[ i ] = { ...values.onForm };
                break;
            }
        }
        setMaps( [ ...maps ] );
        return true;
    }

    const deleteMap = event => {

        const newMaps = maps.filter( map => map.title !== values.inStorage.title );
        setMaps( newMaps );
    }

    return { getValue, setValue, createMap, updateMap, deleteMap };
}

export { useMapForm };