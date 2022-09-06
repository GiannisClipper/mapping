import { useContext } from "react"; 
import { MyMapsContext } from "../MyMapsContext";
import { AppContext } from "../../app/AppContext";
import { useValues } from "../../commons/logic/useValues";

function useMyMapsValues( { initial } ) {

    const inherit = useValues( initial );
    const { setMaps } = useContext( MyMapsContext );
    const { setMyMapsAutoRetrieve } = useContext( AppContext );

    const onRetrieve = maps => {

        setMaps( [ ...maps ] );
        setMyMapsAutoRetrieve( false );
    }

    return { ...inherit, onRetrieve };
}

export { useMyMapsValues };