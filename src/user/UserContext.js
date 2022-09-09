import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserContextProvider = props => {

    const [ user, setUser ] = useState( {} );

    useEffect( () => console.log( 'Has rendered. ', 'UserContextProvider' ) );

    return (
        <UserContext.Provider value={ { user, setUser } }>
            { props.children }
        </UserContext.Provider>
    )
}

export { UserContext, UserContextProvider };
