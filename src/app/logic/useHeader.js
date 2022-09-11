import { useContext } from "react";
import { SigninContext } from "../../signin/SigninContext";
import { AppContext } from "../AppContext";
import { SearchContext } from "../../search/SearchContext";
import { MyMapsContext } from "../../myMaps/MyMapsContext";

function useHeader() {

    const { setPage } = useContext( AppContext );
    const searchContext = useContext( SearchContext );
    const myMapsContext = useContext( MyMapsContext );
    const signinContext = useContext( SigninContext );
    const appContext = useContext( AppContext );
    const { responseSignin: { username } } = signinContext;

    const onSignout = () => { 
        searchContext.setMaps( [] );
        myMapsContext.setMaps( [] );
        signinContext.setResponseSignin( {} );
        appContext.setMyMapsAutoRetrieve( true );
        setPage( { page: "HOME" } );
    };

    return { username, setPage, onSignout };
}

export { useHeader };