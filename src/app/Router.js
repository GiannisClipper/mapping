import { useContext } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "../pages/HomePage";
import { SearchPage } from "../pages/SearchPage";
import { MyMapsPage } from "../pages/MyMapsPage";
import { MapPage } from "../pages/MapPage";

function Router() {

    const { page } = useContext( AppContext );

    return (
        page === "welcome" ? <HomePage welcome={ true }/> :
        page === "home" ? <HomePage /> :
        page === "search" ? <SearchPage /> :
        page === "myMaps" ? <MyMapsPage /> :
        page === "map" ? <MapPage /> :
        null 
    );
}

export { Router };