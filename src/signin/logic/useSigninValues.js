import { useContext } from "react"; 
import { SigninContext } from "../SigninContext";
import { useValues } from "../../commons/logic/useValues";

function useSigninValues( { initial, setStatus } ) {

    const inherit = useValues( initial );
    const { setSchemaOnResponse } = useContext( SigninContext );

    const onCreate = payload => {
        setSchemaOnResponse( { ...payload } );
        setStatus( { afterCreate: true } );
    }

    return { ...inherit, onCreate };
}

export { useSigninValues };