import './style/header.css';

import { useContext } from "react";
import { AppContext } from "./AppContext";
import { SearchContext } from "../search/SearchContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
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

    const { setUsername, homePage, searchPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );

    const signin = () => { 
        setUsername( "john" ); 
        searchContext.setMaps( [] ); 
        myMapsContext.setMaps( [] ); 
        homePage();
    };

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeIcon onClick={ homePage } />
                <Text onClick={ homePage }>Mapping application</Text>
            </Columns>

            <Columns>
                <SearchIcon onClick={ searchPage } />
                <SigninIcon onClick={ signin } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUser( props ) {

    const { username, setUsername, homePage, searchPage, myMapsPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );

    const signout = () => { 
        setUsername( null ); 
        searchContext.setMaps( [] ); 
        myMapsContext.setMaps( [] ); 
        homePage();
    };

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
                <SignoutIcon onClick={ signout } />
            </Columns>
    
        </Columns>
    )
}

export { Header };
