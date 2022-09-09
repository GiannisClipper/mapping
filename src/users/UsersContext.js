import React, { createContext, useState, useEffect } from 'react';

const UsersContext = createContext();

const UsersContextProvider = props => {

    const [ users, setUsers ] = useState( [] );

    useEffect( () => console.log( 'Has rendered.', 'UsersContextProvider' ) );

    return (
        <UsersContext.Provider value={ { users, setUsers } }>
            { props.children }
        </UsersContext.Provider>
    )
}

export { UsersContext, UsersContextProvider };
