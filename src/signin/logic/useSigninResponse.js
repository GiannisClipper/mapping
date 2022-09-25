import { useContext } from "react"; 
import { SigninContext } from "../SigninContext";

function useSigninResponse( { setStatus } ) {

    const { setResponseSignin } = useContext( SigninContext );

    const onPostResponse = ( { request, values, setValues, resetValues } ) => {

        setResponseSignin( request.current.success );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse };
}

export { useSigninResponse };