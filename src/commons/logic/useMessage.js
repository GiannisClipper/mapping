import { useState } from "react";

function useMessage() {

    const [ message, setMessage ] = useState( null );

    const openMessage = text => setMessage( text );
    const closeMessage = () => setMessage( null );

    return { message, openMessage, closeMessage };
}

export { useMessage };