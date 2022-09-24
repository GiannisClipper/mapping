import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { UsersPage } from "../users/UsersPage";
import { MapContextProvider } from "../map/MapContext";
import { MapPage } from "../map/MapPage";

function Router() {

    const { currentPage, setCurrentPage, nextPage } = useContext( AppContext );

    useEffect( () => { 
        if ( ! currentPage.page ) {
            setCurrentPage( { ...nextPage } );
            return;
        }
        if ( currentPage.page !== nextPage.page ) {
            if ( currentPage.onClose ) {
                currentPage.onClose();
                return;
            }
            setCurrentPage( { ...nextPage } );
        }
    }, [ currentPage, setCurrentPage, nextPage ] );

    return (
        currentPage.page === "HOME" ? 
            <HomePage payload={ currentPage.payload }/> 
        : currentPage.page === "SEARCH" ? 
            <SearchPage /> 
        : currentPage.page === "SIGNIN" ? 
            <SigninPage /> 
        : currentPage.page === "MYMAPS" ? 
            <MyMapsPage /> 
        : currentPage.page === "USERS" ? 
            <UsersPage /> 
        : currentPage.page === "MAP" ? 
            <MapContextProvider>
                <MapPage payload={ currentPage.payload }/> 
            </MapContextProvider>
        : null 
    );
}

export { Router };