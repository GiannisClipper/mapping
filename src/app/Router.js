import { useContext } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { UsersPage } from "../users/UsersPage";
import { MapPage } from "../map/MapPage";

function Router() {

    const { page } = useContext( AppContext );

    return (
        page.page === "WELCOME" ? <HomePage welcome={ true }/> :
        page.page === "HOME" ? <HomePage /> :
        page.page === "SEARCH" ? <SearchPage /> :
        page.page === "SIGNIN" ? <SigninPage /> :
        page.page === "MYMAPS" ? <MyMapsPage /> :
        page.page === "USERS" ? <UsersPage /> :
        page.page === "MAP" ? <MapPage map={ page.payload } /> :
        null 
    );
}

export { Router };