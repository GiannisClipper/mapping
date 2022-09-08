import './style/header.css';

import { useContext } from "react";
import { AppContext } from "./AppContext";
import { SearchContext } from "../search/SearchContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Text";
import { 
    HomeButton, SigninButton, SearchButton, MyMapsButton, ProfileButton, SignoutButton,
} from '../commons/Button';

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
                <HomeButton onClick={ homePage }>
                    <Text>Mapping application</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ searchPage } />
                <SigninButton onClick={ signin } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUser( props ) {

    const { username, setUsername, homePage, searchPage, myMapsPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const appContext = useContext( AppContext );

    const signout = () => { 
        setUsername( null ); 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        appContext.setMyMapsAutoRetrieve( true );
        homePage();
    };

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ homePage }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ searchPage } />
                <MyMapsButton onClick={ myMapsPage } />
                <ProfileButton />
                <SignoutButton onClick={ signout } />
            </Columns>
    
        </Columns>
    )
}

export { Header };
