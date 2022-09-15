import "./style/mapPage.css";

import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { List } from '../_commons/List';
import { EditButton, FocusButton, ViewButton, TrashButton } from '../_commons/Button';
import { Lines } from "./Lines";
import { Points } from "./Points";
import { GeoMap } from "../geometry/GeoMap";

function MapPage() {

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
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
    );
}

function Map() {

    const { setMap, map } = useContext( MapContext );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />
                <FocusButton onClick={ e => {
                    console.log( map );
                    if ( ! map.zoom ) {
                        const latLng = map.ref.getCenter();
                        const zoom = map.ref.getZoom();
                        setMap( { ...map, ...latLng, zoom } );
                    } else {
                        map.ref.setView( [ map.lat, map.lng ], map.zoom, { animate: true, duration: 1.5 } );
                    }
                } } />
                <ViewButton />
                <TrashButton />
            </Columns>
        </Row>
    );
}

export { MapPage };