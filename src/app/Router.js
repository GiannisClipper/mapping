import { useContext } from "react";
import { useRouteListener } from "./logic/useRouteListener";
import { MyMapsContext } from "../myMaps/MyMapsContext";
import { SigninContext } from "../signin/SigninContext";
import { Error404Page } from "./Error404Page";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { SigninPage } from "../signin/SigninPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { ProfilePage } from "../profile/ProfilePage";
import { UsersPage } from "../users/UsersPage";
import { MapContextProvider } from "../map/MapContext";
import { MapPage } from "../map/MapPage";
import { ViewPage } from "../map/ViewPage";

function Route( { endpoint, ...props } ) {
    return endpoint === window.location.pathname
        ? props.children
        : null;
}

function Router() {

    const { currentPage } = useRouteListener();
    const { maps: myMaps } = useContext( MyMapsContext );
    const { hasUserSigned, hasAdminSigned, responseSignin: { user_id } } = useContext( SigninContext );

    const endpoints = [ "/", "/search", "/signin", "/mymaps", "/users" ];
    if ( hasUserSigned || hasAdminSigned )  { 
        endpoints.push( "/mymaps" ); 
        myMaps.forEach( map => endpoints.push( `/map/${map.id}` ) );
        // myMaps.forEach( map => endpoints.push( `/view/${map.id}` ) );
    }

    if ( hasUserSigned ) { 
        endpoints.push( `/profile/${user_id}` ); 
    } else if ( hasAdminSigned ) { 
        endpoints.push( "/users" ); 
    }

    const { endpoint } = currentPage;

    return (
        endpoint && endpoint.startsWith( '/view' )
        ? 
        <MapContextProvider>
            <ViewPage /> 
        </MapContextProvider>
        :
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
            <Route endpoint={ `/profile/${user_id}` }> 
                <ProfilePage /> 
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