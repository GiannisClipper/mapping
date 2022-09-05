import { useContext } from "react"; 
import { MyMapsContext } from "../MyMapsContext";
import { AppContext } from "../../app/AppContext";
import { useValues } from "../../commons/logic/useValues";

function useMyMapsValues( { initial } ) {

    const inherit = useValues( initial );
    const { setMaps } = useContext( MyMapsContext );
    const { setMyMapsLoaded } = useContext( AppContext );

    const onRetrieve = maps => {

        setMaps( [ ...maps ] );
        setMyMapsLoaded( true );
    }

    return { ...inherit, onRetrieve };
}

export { useMyMapsValues };