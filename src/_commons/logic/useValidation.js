import { useRef } from "react";

function useValidation( { setStatus } ) {

    const validation = useRef( {} );
    const setValidation = val => validation.current = val;

    const onValidate = validators => {

        let errors = [];
        for ( const validator of validators ) {
            errors.push( validator() );
        }

        errors = errors.filter( error => error !== null );
        setValidation( ( errors.length > 0 ? { errors } : {} ) );
        setStatus( { afterValidation: true } );
    }

    return { validation, setValidation, onValidate };
}

export { useValidation };