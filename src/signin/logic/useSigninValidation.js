import { useValidation } from "../../_commons/logic/useValidation";

function useSigninValidation( { setStatus, values } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate: _onValidate } = inherited;

    const isUsernameBlank = () => {
        return ! values.current.username
            ? "Username could not be blank."
            : null;
    }

    const isPasswordBlank = () => {
        return ! values.current.password
            ? "Password could not be blank."
            : null;
    }

    const onValidate = () => _onValidate( [ isUsernameBlank, isPasswordBlank ] );

    return { ...inherited, onValidate, isUsernameBlank, isPasswordBlank };
}

export { useSigninValidation };