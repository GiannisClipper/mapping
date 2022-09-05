import { useContext } from "react"; 
import { MyMapsContext } from "../../myMaps/MyMapsContext";
import { useValues } from "../../commons/logic/useValues";

function useMapValues( { initial, setStatus } ) {

    const inherited = useValues( initial );
    const { values, setInitial } = inherited;
    const { maps, setMaps } = useContext( MyMapsContext );

    const onCreate = () => {

        setMaps( [ ...maps, values.current ] );
        setInitial();
    }

    const onUpdate = () => {

        for ( let i = 0; i < maps.length; i++ ) {
            if ( maps[ i ].id === values.initial.id ) {
                maps[ i ] = { ...values.current };
                break;
            }
        }
        setMaps( [ ...maps ] );
        setStatus( { afterUpdate: true } );
    }

    const onDelete = () => {

        const newMaps = maps.filter( map => map.id !== values.initial.id );
        setMaps( newMaps );
    }

    return { ...inherited, onCreate, onUpdate, onDelete };
}

export { useMapValues };