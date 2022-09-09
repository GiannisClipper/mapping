import './style/header.css';

import { useContext } from "react";
import { AppContext } from "./AppContext";
import { SearchContext } from "../search/SearchContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { 
    HomeButton, SigninButton, SearchButton, MyMapsButton, ProfileButton, SignoutButton,
} from '../_commons/Button';

function Header( props ) {

    const { username } = useContext( AppContext );

    return (
        ! username
        ? <HeaderWithSignin /> 
        : <HeaderWithUser /> 
    )
}

function HeaderWithSignin( props ) {

    const { setPage } = useContext( AppContext );

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ () => setPage( "HOME" ) }>
                    <Text>Mapping application</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ () => setPage( "SEARCH" ) } />
                <SigninButton onClick={ () => setPage( "SIGNIN" ) } />
            </Columns>
    
        </Columns>
    )
}

function HeaderWithUser( props ) {

    const { username, setUsername, setPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const appContext = useContext( AppContext );

    const signout = () => { 
        setUsername( null ); 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        appContext.setMyMapsAutoRetrieve( true );
        setPage( "HOME" );
    };

    return (

        <Columns className="Header">

            <Columns className="title">
                <HomeButton onClick={ () => setPage( "HOME" ) }>
                    <Text>Mapping / { username }</Text>
                </HomeButton>
            </Columns>

            <Columns>
                <SearchButton onClick={ () => setPage( "SEARCH" ) } />
                <MyMapsButton onClick={ () => setPage( "MYMAPS" ) } />
                <ProfileButton />
                <SignoutButton onClick={ signout } />
            </Columns>
    
        </Columns>
    )
}

export { Header };
