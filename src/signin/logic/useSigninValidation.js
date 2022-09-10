import { useValidation } from "../../_commons/logic/useValidation";
import { isUsernameBlank, isPasswordBlank } from "../../user/logic/useUserValidation";

function useSigninValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate } = inherited;
    
    const onCreateValidate = () => onValidate( [ 
        () => isUsernameBlank( { values } ), 
        () => isPasswordBlank( { values } ),
    ] );
    return { ...inherited, onCreateValidate };
}

export { useSigninValidation };