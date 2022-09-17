import "./style/mapPage.css";

import { useRef, useEffect } from "react";
import { GeoRefContextProvider } from "../geometry/GeoRefContext";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { List } from '../_commons/List';
import { Map } from "./Map";
import { Lines } from "./Lines";
import { Points } from "./Points";
import { GeoMap } from "../geometry/GeoMap";
import { Map as LeafMap } from "../leaflet/map";
import { Point as LeafPoint } from "../leaflet/point";
import { Line as LeafLine } from "../leaflet/line";
// import leafContext from "../leaflet/context";

function MapPage() {

    useEffect( () => { 
        LeafMap.setup( "map" );
        LeafPoint.add();
        LeafLine.add();
    }, [] );

    useEffect( () => () => { 
        LeafMap.remove();
    }, [] );

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        <GeoRefContextProvider>
        <Page className="MapPage">
            <LeftColumn>
            <List className="mapContents">
                <DropDown title="Map">
                    <Map />
                </DropDown>
                <DropDown title="Lines">
                    <Lines />
                </DropDown>
                <DropDown title="Points">
                    <Points />
                </DropDown>
            </List>
            </LeftColumn>

            <RightColumn>
                {/* <GeoMap /> */}
                <div id="map" className="GeoMap" />
            </RightColumn>
        </Page>
        </GeoRefContextProvider>
    );
}

export { MapPage };