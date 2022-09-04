import { useState } from "react";

function useForm() {

    const [ form, setForm ] = useState( null );

    const openForm = payload => setForm( { payload } );
    const closeForm = () => setForm( null );

    return { form, openForm, closeForm };
}

export { useForm };