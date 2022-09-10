import { useState } from "react";

function useValues( initial ) {

    initial = initial || {};

    const [ values, setValues ] = useState( { 
        initial, 
        changeable: { ...initial }
    } );

    const getValue = key => values.changeable[ key ];

    const setValue = ( key, value ) =>
        setValues( { 
        initial: values.initial,
        changeable: { ...values.changeable, [key]: value } 
    } )

    const resetValues = () => setValues( { 
        initial: values.initial,
        changeable: { ...values.initial }
    } )

    return { values, getValue, setValue, resetValues };
}

export { useValues };