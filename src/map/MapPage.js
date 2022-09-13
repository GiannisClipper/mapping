import "./style/mapPage.css";

import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { OSMapContextProvider, OSMapContext } from "../OSMap/OSMapContext";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { List } from '../_commons/List';
import { EditButton, NavigateButton, ViewButton, TrashButton } from '../_commons/Button';
import { Lines } from "./Lines";
import { Points } from "./Points";
import { OSMap as OpenStreetMap } from "../OSMap/OSMap";

function MapPage() {

    const { map } = useContext( MapContext );

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        <OSMapContextProvider>
        <Page className="MapPage">
            <LeftColumn>
            <List className="mapContents">
                <DropDown title="Map">
                    <Map map={ map }/>
                </DropDown>
                <DropDown title="Lines">
                    <Lines lines={ map.lines }/>
                </DropDown>
                <DropDown title="Points">
                    <Points points={ map.points }/>
                </DropDown>
            </List>
            </LeftColumn>

            <RightColumn>
                <OpenStreetMap />
            </RightColumn>
        </Page>
        </OSMapContextProvider>
    );
}

function Map() {

    const { map, setMap } = useContext( MapContext );
    const mapRef = useContext( OSMapContext );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />
                <NavigateButton onClick={ e => {
                    const latLng = mapRef.current.map.getCenter();
                    const zoom = mapRef.current.map.getZoom();
                    setMap( { ...map, ...latLng, zoom } );
                } } />
                <ViewButton />
                <TrashButton />
            </Columns>
        </Row>
    );
}

export { MapPage };