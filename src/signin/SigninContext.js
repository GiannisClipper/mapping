import React, { createContext, useState, useEffect } from 'react';
import { newRequestSchema, newResponseSchema } from '../signin/logic/schema';

const SigninContext = createContext();

const SigninContextProvider = props => {

    const [ requestSignin, setRequestSignin ] = useState( newRequestSchema() );
    const [ responseSignin, setResponseSignin ] = useState( newResponseSchema() );

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
