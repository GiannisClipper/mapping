import "./style/mapPage.css";

import { useEffect } from "react";
import { GeoRefContextProvider } from "../geometry/GeoRefContext";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { List } from '../_commons/List';
import { Map } from "./Map";
import { Lines } from "./Lines";
import { Points } from "./Points";
import { GeoMap } from "../geometry/GeoMap";

function MapPage() {

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
                <GeoMap />
            </RightColumn>
        </Page>
        </GeoRefContextProvider>
    );
}

export { MapPage };