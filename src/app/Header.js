import './style/header.css';

import { useContext } from "react";
import { usePage } from "./logic/usePage"; 
import { SigninContext } from "../signin/SigninContext";
import { AppContext } from "./AppContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { 
    HomeButton, SigninButton, SearchButton, MapButton, ProfileButton, UsersButton, SignoutButton,
    SaveButton, ViewButton
} from '../_commons/Button';

function Header( props ) {

    const { hasUserSigned, hasAdminSigned } = useContext( SigninContext );

    return (
        hasAdminSigned
        ? <HeaderWithAdminOptions { ...props } />
        : hasUserSigned
        ? <HeaderWithUserOptions { ...props } /> 
        : <HeaderWithSigninOptions { ...props } /> 

    )
}

function HeaderWithSigninOptions( props ) {

    const { onClickHome, onClickSearch, onClickSignin } = usePage();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton title="Home" onClick={ onClickHome }>
                    <Text>Mapping application</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton title="Search maps" onClick={ onClickSearch } />
                <SigninButton title="Signin" onClick={ onClickSignin } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUserOptions( props ) {

    const { currentPage } = useContext( AppContext );
    const { username, onClickHome, onClickSearch, onClickMyMaps, onClickSignout } = usePage();

    return (
        <Columns className="Header">

            <Columns className="title">
                <HomeButton title="Home" onClick={ onClickHome }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                { currentPage.endpoint && currentPage.endpoint.startsWith( "/map/" )
                ? <MapOptions { ...props } />
                : null
                }
                <SearchButton title="Search maps" onClick={ onClickSearch } />
                <MapButton title="My maps" onClick={ onClickMyMaps } />
                <ProfileButton title="My profile" />
                <SignoutButton title="Signout" onClick={ onClickSignout } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithAdminOptions( props ) {

    const { currentPage } = useContext( AppContext );
    const { username, onClickHome, onClickSearch, onClickMyMaps, onClickUsers, onClickSignout } = usePage();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton title="Home" onClick={ onClickHome }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                { currentPage.endpoint && currentPage.endpoint.startsWith( "/map/" )
                ? <MapOptions { ...props } />
                : null
                }
                <SearchButton title="Search maps" onClick={ onClickSearch } />
                <MapButton title="My maps" onClick={ onClickMyMaps } />
                <UsersButton title="Users" onClick={ onClickUsers } />
                <SignoutButton title="Signout" onClick={ onClickSignout } />
            </Columns>
    
        </Columns>
    )
}

function MapOptions( { onClickSave, status } ) {

    const isWaiting = onClickSave && Object.keys( status ).length > 0;

    return (
        <>
        <SaveButton title="Save map" onClick={ onClickSave } isWaiting={ isWaiting } />
        <ViewButton title="View map" onClick={ () => {} } />
        </>
    );
}

export { Header };
