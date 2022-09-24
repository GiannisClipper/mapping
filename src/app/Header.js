import './style/header.css';

import { useContext } from "react";
import { usePage } from "./logic/usePage"; 
import { SigninContext } from "../signin/SigninContext";
import { AppContext } from "./AppContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { 
    HomeButton, SigninButton, SearchButton, MyMapsButton, ProfileButton, UsersButton, SignoutButton,
    SaveButton, ViewButton
} from '../_commons/Button';

function Header( props ) {

    const { responseSignin: { username, user_type } } = useContext( SigninContext );

    return (
        ! username
        ? <HeaderWithSigninOptions { ...props } /> 
        : user_type === "ADMIN"
        ? <HeaderWithAdminOptions { ...props } />
        : <HeaderWithUserOptions { ...props } /> 
    )
}

function HeaderWithSigninOptions( props ) {

    const { onClickHome, onClickSearch, onClickSignin } = usePage();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ onClickHome }>
                    <Text>Mapping application</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ onClickSearch } />
                <SigninButton onClick={ onClickSignin } />
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
                <HomeButton onClick={ onClickHome }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                { currentPage.page === "MAP"
                ? <MapButtons { ...props } />
                : null
                }
                <SearchButton onClick={ onClickSearch } />
                <MyMapsButton onClick={ onClickMyMaps } />
                <ProfileButton />
                <SignoutButton onClick={ onClickSignout } />
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
                <HomeButton onClick={ onClickHome }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                { currentPage.page === "MAP"
                ? <MapButtons { ...props } />
                : null
                }
                <SearchButton onClick={ onClickSearch } />
                <MyMapsButton onClick={ onClickMyMaps } />
                <UsersButton onClick={ onClickUsers } />
                <SignoutButton onClick={ onClickSignout } />
            </Columns>
    
        </Columns>
    )
}

function MapButtons( { onClickUpdate, updateStatus } ) {

    const isWaiting = updateStatus && Object.keys( updateStatus ).length > 0;

    return (
        <>
        <SaveButton onClick={ onClickUpdate } isWaiting={ isWaiting } />
        <ViewButton onClick={ () => {} } />
        </>
    );
}

export { Header };
