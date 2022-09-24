import { useState } from "react";

function useValues( initial ) {

    initial = initial || {};

    const [ values, setValues ] = useState( { 
        initial, 
        changeable: { ...initial }
    } );

    const resetValues = () => setValues( { 
        initial: values.initial,
        changeable: { ...values.initial }
    } )

    const getValue = key => values.changeable[ key ];

    const setValue = ( key, value ) =>
        setValues( { 
        initial: values.initial,
        changeable: { ...values.changeable, [key]: value } 
    } )

    return { values, setValues, resetValues, getValue, setValue };
}

export { useValues };