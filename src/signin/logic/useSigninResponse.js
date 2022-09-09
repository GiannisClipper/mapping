import { useContext } from "react"; 
import { SigninContext } from "../SigninContext";

function useSigninResponse( { setInitial, setStatus } ) {

    const { setResponseSignin } = useContext( SigninContext );

    const onCreate = ( { values, request } ) => {

        setResponseSignin( request.current.success );
        setStatus( { afterResponse: true } );
    }

    return { onCreate };
}

export { useSigninResponse };