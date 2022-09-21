import "./style/mapPage.css";

import { useEffect } from "react";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { List } from '../_commons/List';
import { Map } from "./Map";
import { Lines } from "./Lines";
import { Points } from "./Points";
import { MapGeometry } from "./MapGeometry";
import { MapTools } from "./MapTools";

function MapPage() {

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        <Page className="MapPage">
            <LeftColumn>
            <List>
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
                <MapGeometry />
                <MapTools />
            </RightColumn>
        </Page>
    );
}

export { MapPage };