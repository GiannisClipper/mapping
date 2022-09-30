import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { MapContext } from "../MapContext";
import { newMapSchema } from "./schema";
import { deepCopy } from "../../_commons/logic/helpers";

function useMapResponse( { setStatus } ) {

    const { maps, setMaps } = useContext( MyMapsContext );

    const mapContext = useContext( MapContext );

    const onPostResponse = ( { request, values, setValues, resetValues } ) => {

        setMaps( [ ...maps, values.changeable ] );
        resetValues();
        setStatus( { afterResponse: true } );
    }

    const onPutResponse = ( { request, values, setValues, resetValues } ) => {

        const { setMap, map } = mapContext;
        setMap( { ...map, ...request.current.success } );

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].id === values.initial.id ) {
                maps[ i ] = request.current.success;
                break;
            }
        }
        setMaps( [ ...maps ] );
        setValues( {
            initial: request.current.success, 
            changeable: request.current.success,
        } );
        setStatus( { afterResponse: true } );
    }

    const onGetResponse = ( { request, values, setValues, resetValues } ) => {

        const { setMap } = mapContext;
        const newMap = { ...newMapSchema, ...deepCopy( request.current.success ) };
        setMap( newMap );
        setValues( {
            initial: newMap, 
            changeable: newMap,
        } );
        setStatus( { afterResponse: true } );
    }

    const onDeleteResponse = ( { request, values, setValues, resetValues } ) => {

        // the url here is based on map id (host/map/id), so we should change the browser address
        // before removing id from state, rerendering page and raising 404 error
        window.history.back();

        const newMaps = maps.filter( map => map.id !== values.initial.id );
        setMaps( newMaps );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse, onPutResponse, onGetResponse, onDeleteResponse };
}

export { useMapResponse };