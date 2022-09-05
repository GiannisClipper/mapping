import { useRef } from "react";

function useValidation() {

    const validation = useRef( {} );
    const setValidation = val => validation.current = val;

    return { validation, setValidation };
}

export { useValidation };