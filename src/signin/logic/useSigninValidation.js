import { useContext } from "react";
import { useValidation } from "../../_commons/logic/useValidation";

function useSigninValidation( { setStatus, values } ) {

    const inherited = useValidation();
    const { setValidation } = inherited;

    const onValidate = () => {

        if ( ! values.current.username ) {
            setValidation( { error: "Username should not be blank." } );
            setStatus( { afterValidation: true } );
            return;
        }

        if ( ! values.current.password ) {
            setValidation( { error: "Username should not be blank." } );
            setStatus( { afterValidation: true } );
            return;
        }

        setValidation( {} );
        setStatus( { afterValidation: true } );
        return;
    }

    return { ...inherited, onValidate };
}

export { useSigninValidation };