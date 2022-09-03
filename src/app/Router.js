import { useContext } from "react";
import { AppContext } from "./AppContext";
import { HomePage } from "./HomePage";
import { SearchPage } from "../search/SearchPage";
import { MyMapsPage } from "../myMaps/MyMapsPage";
import { MapPage } from "../map/MapPage";

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