import { useContext } from "react"; 
import { SearchContext } from "../SearchContext";
import { useValues } from "../../commons/logic/useValues";

function useSearchValues( { initial } ) {

    const inherit = useValues( initial );
    const { setMaps } = useContext( SearchContext );

    const onRetrieve = maps => setMaps( [ ...maps ] );

    return { ...inherit, onRetrieve };
}

export { useSearchValues };