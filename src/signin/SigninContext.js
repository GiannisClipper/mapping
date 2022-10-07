import React, { createContext, useState, useEffect } from 'react';
import { newRequestSchema, newResponseSchema } from '../signin/logic/schema';

const SigninContext = createContext();

const SigninContextProvider = props => {

    const [ requestSignin, setRequestSignin ] = useState( newRequestSchema() );
    // const [ responseSignin, setResponseSignin ] = useState( newResponseSchema() );

    const [ responseSignin, setResponseSignin ] = useState( { token: "", user_id: "1010", username: "john", user_type: "ADMIN" } );

    const hasUserSigned = responseSignin.user_type && responseSignin.user_type === "USER";
    const hasAdminSigned = responseSignin.user_type && responseSignin.user_type === "ADMIN";

    useEffect( () => console.log( 'Has rendered.', 'SigninContextProvider' ) );

    return (
        <SigninContext.Provider value={ { 
            requestSignin, setRequestSignin,
            responseSignin, setResponseSignin,
            hasUserSigned, hasAdminSigned
        } }>
            { props.children }
        </SigninContext.Provider>
    )
}

export { SigninContext, SigninContextProvider };
