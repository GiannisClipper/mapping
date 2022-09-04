import { useState } from "react";

function useForm() {

    const [ form, setForm ] = useState( null );

    const openForm = payload => setForm( { payload } );
    const closeForm = () => setForm( null );

    return { form, openForm, closeForm };
}

function useValues( initialValues ) {

    const [ values, setValues ] = useState( { 
        inStorage: initialValues, 
        onForm: { ...initialValues }
    } );

    const getValue = key => values.onForm[ key ];

    const setValue = ( key, value ) => setValues( { 
        inStorage: values.inStorage,
        onForm: { ...values.onForm, [key]: value } 
    } )

    return { values, setValue, getValue };
}

export { useForm, useValues };