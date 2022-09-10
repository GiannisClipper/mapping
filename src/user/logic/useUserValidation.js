import { useValidation } from "../../_commons/logic/useValidation";

const isUsernameBlank = ( { values } ) => {
    return ! values.changeable.username
        ? "Username could not be blank."
        : null;
}

const isPasswordBlank = ( { values } ) => {
    return ! values.changeable.password
        ? "Password could not be blank."
        : null;
}

function useUserValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate } = inherited;

    const onCreateValidate = () => onValidate( [ 
        () => isUsernameBlank( { values } ), 
        () => isPasswordBlank( { values } ),
    ] );

    const onUpdateValidate = onCreateValidate;

    return { ...inherited, onCreateValidate, onUpdateValidate };
}

export { useUserValidation, isUsernameBlank, isPasswordBlank };