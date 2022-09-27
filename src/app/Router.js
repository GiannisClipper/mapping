import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { UsersPage } from "../users/UsersPage";
import { MapContextProvider } from "../map/MapContext";
import { MapPage } from "../map/MapPage";

function Router() {

    const { currentPage, setCurrentPage, nextPage, setNextPage } = useContext( AppContext );
    const { maps: myMaps } = useContext( MyMapsContext );

    useEffect( () => { 
        if ( ! currentPage.endpoint ) {
            setCurrentPage( { ...nextPage } );
            return;
        }
        if ( currentPage.endpoint !== nextPage.endpoint ) {
            if ( currentPage.onClose ) {
                currentPage.onClose();
                return;
            }
            setCurrentPage( { ...nextPage } );
        }
    }, [ currentPage, setCurrentPage, nextPage ] );

    useEffect( () => { 
        const onPopstate = event => setNextPage( { endpoint: window.location.pathname } );
        window.addEventListener( 'popstate', onPopstate );
        return () => window.removeEventListener( 'popstate', onPopstate );
    }, [] );

    const endpoints = [ "/", "/search", "/signin", "/mymaps", "/users" ];
    myMaps.forEach( map => endpoints.push( `/map/${map.id}` ) );
    const { endpoint } = currentPage;
        
    return (
        ! endpoints.includes( endpoint ) ?
            <div>Error 404, page not found.</div>
        : endpoint === "/" ? 
            <HomePage /> 
        : endpoint === "/search" ? 
            <SearchPage /> 
        : endpoint === "/signin" ? 
            <SigninPage /> 
        : endpoint === "/mymaps" ? 
            <MyMapsPage /> 
        : endpoint === "/users" ? 
            <UsersPage /> 
        : endpoint && endpoint.startsWith( "/map/" ) ? 
            <MapContextProvider>
                <MapPage /> 
            </MapContextProvider>
        : null 
    );
}

export { Router };