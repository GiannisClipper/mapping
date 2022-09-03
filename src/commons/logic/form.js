import { useState } from "react";

function useForm() {

    const [ form, setForm ] = useState( false );

    const openForm = () => setForm( true );
    const closeForm = () => setForm( false );

    return { form, openForm, closeForm };
}

function useValues() {

    const [ values, setValues ] = useState( { inStorage: {}, onForm: {} } );

    return { values, setValues };
}

export { useForm, useValues };