import { useContext } from "react";
import { SigninContext } from "../../signin/SigninContext";
import { AppContext } from "../AppContext";
import { SearchContext } from "../../search/SearchContext";
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function usePage() {

    const { setNextPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const signinContext = useContext( SigninContext );
    const appContext = useContext( AppContext );

    const { responseSignin: { username } } = signinContext;

    const onClickHome = () => setNextPage( { page: "HOME" } );
    const onClickSearch = () => setNextPage( { page: "SEARCH" } );
    const onClickSignin = () => setNextPage( { page: "SIGNIN" } );
    const onClickMyMaps = () => setNextPage( { page: "MYMAPS" } );
    const onClickUsers = () => setNextPage( { page: "USERS" } );
    const onClickSignout = () => { 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        signinContext.setResponseSignin( {} );
        appContext.setMyMapsAutoRetrieve( true );
        setNextPage( { page: "HOME" } );
    };

    return { username, onClickHome, onClickSearch, onClickSignin, onClickMyMaps, onClickUsers, onClickSignout };
}

export { usePage };