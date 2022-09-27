import { useContext, useEffect } from "react";
import { AppContext } from "./AppContext";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { SigninContext } from "../signin/SigninContext";
import { Error404Page } from "./Error404Page";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { UsersPage } from "../users/UsersPage";
import { MapContextProvider } from "../map/MapContext";
import { MapPage } from "../map/MapPage";

function Route( { endpoint, ...props } ) {
    return endpoint === window.location.pathname
        ? props.children
        : null;
}

function Router() {

    const { currentPage, setCurrentPage, nextPage, setNextPage } = useContext( AppContext );
    const { maps: myMaps } = useContext( MyMapsContext );
    const { hasUserSigned, hasAdminSigned } = useContext( SigninContext );

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
    if ( hasUserSigned || hasAdminSigned )  { 
        endpoints.push( "/mymaps" ); 
        myMaps.forEach( map => endpoints.push( `/map/${map.id}` ) );
    }
    if ( hasAdminSigned ) { 
        endpoints.push( "/users" ); 
    }

    const { endpoint } = currentPage;

    return (
        endpoints.includes( endpoint )    
        ? 
        <> 
            <Route endpoint="/">
                <HomePage /> 
            </Route>
            <Route endpoint="/search">
                <SearchPage /> 
            </Route>
            <Route endpoint="/signin">
                <SigninPage /> 
            </Route>
            <Route endpoint="/mymaps"> 
                <MyMapsPage /> 
            </Route>
            <Route endpoint="/users"> 
                <UsersPage /> 
            </Route>

            <>
            { myMaps.map( map => 
                <Route endpoint={ `/map/${map.id}` }> 
                    <MapContextProvider>
                        <MapPage /> 
                    </MapContextProvider>
                </Route>
            ) }
            </>
        </>
        :
        <Error404Page />
    );
}

export { Router };