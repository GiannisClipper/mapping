import { useContext } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { MapPage } from "../map/MapPage";

function Router() {

    const { page } = useContext( AppContext );

    return (
        page === "WELCOME" ? <HomePage welcome={ true }/> :
        page === "HOME" ? <HomePage /> :
        page === "SEARCH" ? <SearchPage /> :
        page === "SIGNIN" ? <SigninPage /> :
        page === "MYMAPS" ? <MyMapsPage /> :
        page === "MAP" ? <MapPage /> :
        null 
    );
}

export { Router };