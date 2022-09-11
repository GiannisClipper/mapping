import './style/header.css';

import { useContext } from "react";
import { useHeader } from "./logic/useHeader"; 
import { SigninContext } from "../signin/SigninContext";
import { AppContext } from "./AppContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { 
    HomeButton, SigninButton, SearchButton, MyMapsButton, ProfileButton, UsersButton, SignoutButton,
} from '../_commons/Button';

function Header( props ) {

    const { responseSignin: { username, user_type } } = useContext( SigninContext );

    return (
        ! username
        ? <HeaderWithSignin /> 
        : user_type === "ADMIN"
        ? <HeaderWithAdmin />
        : <HeaderWithUser /> 
    )
}

function HeaderWithSignin( props ) {

    const { setPage } = useContext( AppContext );

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ () => setPage( { page: "HOME" } ) }>
                    <Text>Mapping application</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ () => setPage( { page: "SEARCH" } ) } />
                <SigninButton onClick={ () => setPage( { page: "SIGNIN" } ) } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUser( props ) {

    const { username, setPage, onSignout } = useHeader();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ () => setPage( { page: "HOME" } ) }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ () => setPage( { page: "SEARCH" } ) } />
                <MyMapsButton onClick={ () => setPage( { page: "MYMAPS" } ) } />
                <ProfileButton />
                <SignoutButton onClick={ onSignout } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithAdmin( props ) {

    const { username, setPage, onSignout } = useHeader();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ () => setPage( { page: "HOME" } ) }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ () => setPage( { page: "SEARCH" } ) } />
                <MyMapsButton onClick={ () => setPage( { page: "MYMAPS" } ) } />
                <UsersButton onClick={ () => setPage( { page: "USERS" } ) } />
                <SignoutButton onClick={ onSignout } />
            </Columns>
    
        </Columns>
    )
}

export { Header };
