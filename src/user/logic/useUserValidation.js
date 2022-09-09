import { useValidation } from "../../_commons/logic/useValidation";

const isUsernameBlank = ( { values } ) => {
    return ! values.current.username
        ? "Username could not be blank."
        : null;
}

const isPasswordBlank = ( { values } ) => {
    return ! values.current.password
        ? "Password could not be blank."
        : null;
}

function useUserValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate: _onValidate } = inherited;

    const onValidate = () => _onValidate( [ 
        () => isUsernameBlank( { values } ), 
        () => isPasswordBlank( { values } ),
    ] );

    return { ...inherited, onValidate };
}

export { useUserValidation, isUsernameBlank, isPasswordBlank };