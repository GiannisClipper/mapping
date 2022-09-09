import { useValidation } from "../../_commons/logic/useValidation";
import { isUsernameBlank, isPasswordBlank } from "../../user/logic/useUserValidation";

function useSigninValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate: _onValidate } = inherited;

    const onValidate = () => _onValidate( [ 
        () => isUsernameBlank( values.current.username ), 
        () => isPasswordBlank( values.current.password ),
    ] );
    
    return { ...inherited, onValidate };
}

export { useSigninValidation };