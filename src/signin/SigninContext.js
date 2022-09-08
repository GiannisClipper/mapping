import React, { createContext, useState, useEffect } from 'react';
import { newSchemaOnRequest, newSchemaOnResponse } from '../signin/logic/schema';

const SigninContext = createContext();

const SigninContextProvider = props => {

    const [ schemaOnRequest, setSchemaOnRequest ] = useState( newSchemaOnRequest() );
    const [ schemaOnResponse, setSchemaOnResponse ] = useState( newSchemaOnResponse() );

    useEffect( () => console.log( 'Has rendered.', 'SigninContextProvider' ) );

    return (
        <SigninContext.Provider value={ { 
            schemaOnRequest, setSchemaOnRequest,
            schemaOnResponse, setSchemaOnResponse
        } }>
            { props.children }
        </SigninContext.Provider>
    )
}

export { SigninContext, SigninContextProvider };
