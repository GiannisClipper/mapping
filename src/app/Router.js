import { useContext } from "react";
import { usePageListener } from "./logic/usePage";
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

    const { currentPage } = usePageListener();
    const { maps: myMaps } = useContext( MyMapsContext );
    const { hasUserSigned, hasAdminSigned } = useContext( SigninContext );

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
                <Route key={ map.id } endpoint={ `/map/${map.id}` }> 
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