import { useState } from "react";

function useValues( initial ) {

    const [ values, setValues ] = useState( { 
        initial, 
        current: { ...initial }
    } );

    const getValue = key => values.current[ key ];

    const setValue = ( key, value ) => setValues( { 
        initial: values.initial,
        current: { ...values.current, [key]: value } 
    } )

    const setInitialValues = () => setValues( { 
        initial: values.initial,
        current: { ...values.initial }
    } )

    return { values, getValue, setValue, setInitialValues };
}

export { useValues };