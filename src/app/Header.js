import './style/header.css';

import { useContext } from "react";
import { useOption } from "./logic/useOption"; 
import { SigninContext } from "../signin/SigninContext";
import { AppContext } from "./AppContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";

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

function HeaderWithSigninOptions() {

    const { HomeOption, SearchOption, SigninOption } = useOption();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeOption>
                    <Text>Mapping application</Text>
                </HomeOption>
            </Columns>

            <Columns>
                <SearchOption />
                <SigninOption />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUserOptions( props ) {

    const { currentPage } = useContext( AppContext );
    const { responseSignin: { username } } = useContext( SigninContext );
    const { HomeOption, SearchOption, MyMapsOption, ProfileOption, SignoutOption } = useOption();

    return (
        <Columns className="Header">

            <Columns className="title">
                <HomeOption>
                    <Text>Mapping / { username }</Text>
                </HomeOption>
            </Columns>

            <Columns>
                { currentPage.endpoint && currentPage.endpoint.startsWith( "/map/" )
                ? <MapOptions { ...props } /> : null 
                }
                <SearchOption />
                <MyMapsOption />
                <ProfileOption />
                <SignoutOption />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithAdminOptions( props ) {

    const { currentPage } = useContext( AppContext );
    const { responseSignin: { username } } = useContext( SigninContext );
    const { HomeOption, SearchOption, MyMapsOption, UsersOption, SignoutOption } = useOption();

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeOption>
                    <Text>Mapping / { username }</Text>
                </HomeOption>
            </Columns>

            <Columns>
                { currentPage.endpoint && currentPage.endpoint.startsWith( "/map/" )
                ? <MapOptions { ...props } /> : null 
                }
                <SearchOption />
                <MyMapsOption />
                <UsersOption />
                <SignoutOption />
            </Columns>
    
        </Columns>
    )
}

function MapOptions( { onClickSave, onClickView, status } ) {

    const { SaveMapOption, ViewMapOption } = useOption();
    const isWaiting = onClickSave && Object.keys( status ).length > 0;

    return (
        <>
        <SaveMapOption onClick={ onClickSave } isWaiting={ isWaiting } />
        <ViewMapOption onClick={ onClickView } />
        </>
    );
}

export { Header };
