import './style/header.css';

import { useContext } from "react";
import { AppContext } from "./AppContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { 
    HomeIcon, SigninIcon, SignoutIcon,
    SearchIcon, MyMapsIcon, ProfileIcon,
} from "../commons/Icons";

function Header( props ) {

    const { username } = useContext( AppContext );

    return (
        ! username
        ? <HeaderWithSignin /> 
        : <HeaderWithUser /> 
    )
}

function HeaderWithSignin( props ) {

    const { homePage, searchPage, signin } = useContext( AppContext );

    const goSignin = () => { signin(); homePage() };

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeIcon onClick={ homePage } />
                <Text onClick={ homePage }>Mapping application</Text>
            </Columns>

            <Columns>
                <SearchIcon onClick={ searchPage } />
                <SigninIcon onClick={ goSignin } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUser( props ) {

    const { username, homePage, searchPage, myMapsPage, signout } = useContext( AppContext );

    const goSignout = () => { signout(); homePage() };

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeIcon onClick={ homePage } />
                <Text onClick={ homePage }>Mapping / { username }</Text>
            </Columns>

            <Columns>
                <SearchIcon onClick={ searchPage } />
                <MyMapsIcon onClick={ myMapsPage } />
                <ProfileIcon />
                <SignoutIcon onClick={ goSignout } />
            </Columns>
    
        </Columns>
    )
}

export { Header };
