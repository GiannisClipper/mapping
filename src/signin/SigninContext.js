import React, { createContext, useState, useEffect } from 'react';
import { newRequestSchema, newResponseSchema } from '../signin/logic/schema';

const SigninContext = createContext();

const SigninContextProvider = props => {

    const [ requestSignin, setRequestSignin ] = useState( newRequestSchema() );
    // const [ responseSignin, setResponseSignin ] = useState( newResponseSchema() );


    const devTemporary = {
        token: "",
        user_id: "1010",
        user_type: "ADMIN",
        username: "john",
    };
    const [ responseSignin, setResponseSignin ] = useState( devTemporary );

    
    useEffect( () => console.log( 'Has rendered.', 'SigninContextProvider' ) );

    return (
        <SigninContext.Provider value={ { 
            requestSignin, setRequestSignin,
            responseSignin, setResponseSignin,
        } }>
            { props.children }
        </SigninContext.Provider>
    )
}

export { SigninContext, SigninContextProvider };
