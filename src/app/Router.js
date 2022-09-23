import { useContext } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { UsersPage } from "../users/UsersPage";
import { MapContextProvider } from "../map/MapContext";
import { MapPage } from "../map/MapPage";

function Router() {

    const { page: { page, payload } } = useContext( AppContext );

    return (
        page === "WELCOME" ? <HomePage welcome={ true }/> :
        page === "HOME" ? <HomePage /> :
        page === "SEARCH" ? <SearchPage /> :
        page === "SIGNIN" ? <SigninPage /> :
        page === "MYMAPS" ? <MyMapsPage /> :
        page === "USERS" ? <UsersPage /> :
        page === "MAP" ? 
            <MapContextProvider>
                <MapPage payload={ payload }/> 
            </MapContextProvider>
        :
        null 
    );
}

export { Router };