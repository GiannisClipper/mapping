import { useContext } from "react"; 
import { SigninContext } from "../SigninContext";

function useSigninResponse( { resetValues, setStatus } ) {

    const { setResponseSignin } = useContext( SigninContext );

    const onPostResponse = ( { values, request } ) => {

        setResponseSignin( request.current.success );
        setStatus( { afterResponse: true } );
    }

    return { onPostResponse };
}

export { useSigninResponse };