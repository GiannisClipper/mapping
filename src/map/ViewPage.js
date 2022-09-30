import { useEffect, useContext } from "react";
import { useMessage } from "../_commons/logic/useMessage";
import { useValues } from "../_commons/logic/useValues";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { newMapSchema } from "./logic/schema";
import { useMapRequest } from "./logic/useMapRequest";
import { useMapResponse } from "./logic/useMapResponse";
import { MapContext } from "./MapContext";
import { BlankPage } from '../app/Page';
import { MapGeometry } from "./MapGeometry";
import { Map as GeoMap } from "../geometry/map";
import { Line as GeoLine } from "../geometry/line";
import { Point as GeoPoint } from "../geometry/point";

import { Message } from "../_commons/Message";

function ViewPage() {

    const tmp = window.location.pathname.split( '/' );
    const id = tmp[ tmp.length - 1 ];

    const { values, setValues } = useValues( newMapSchema( { id } ) );
    const { message, openMessage, closeMessage } = useMessage();

    const { status } = useRetrieveFlow( {
        values,
        setValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
        initialStatus: { triggeredFlow: true }
    } );

    const { map } = useContext( MapContext );

    useEffect( () => {
        GeoMap.onLoad( map );
        GeoLine.onLoad( map.lines );
        GeoPoint.onLoad( map.points );
    }, [ map ] );

    useEffect( () => console.log( 'Has rendered:', 'ViewPage' ) );

    return (

        <BlankPage className="ViewPage">
                {/* { Object.keys( status ).length > 0
                ? <LoaderIcon /> */}
                <MapGeometry />
                {/* } */}

            { message 
            ? <Message message={ message } onClose={ closeMessage } />
            : null 
            }

        </BlankPage>
    );
}

export { ViewPage };