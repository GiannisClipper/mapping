import "./style/mapPage.css";

import { useEffect, useContext } from "react";
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow, useUpdateFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newMapSchema } from "./logic/schema";
import { useMapRequest } from "./logic/useMapRequest";
import { useMapResponse } from "./logic/useMapResponse";
import { MapContext } from "./MapContext";
import { LoaderIcon } from "../_commons/Icon";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { List } from '../_commons/List';
import { Map } from "./Map";
import { Lines } from "./Lines";
import { Points } from "./Points";
import { MapGeometry } from "./MapGeometry";
import { MapTools } from "./MapTools";
import { Message } from "../_commons/Message";

function MapPage( { payload } ) {

    const { map: { id } } = payload;

    const { values, resetValues } = useValues( newMapSchema( { id } ) );
    const { message, openMessage, closeMessage } = useMessage();

    const { status: retrieveStatus } = useRetrieveFlow( {
        values,
        resetValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
        initialStatus: { triggeredFlow: true }
    } );

    const { status: updateStatus, setStatus: setUpdateStatus } = useUpdateFlow( {
        values,
        resetValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
    } );

    const { map } = useContext( MapContext );

    const onClickUpdate = () => {
        values.changeable = { ...map };
        setUpdateStatus( { triggeredFlow: true } );
    }

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        
        <Page className="MapPage" 
            onClickUpdate={ onClickUpdate } 
            updateStatus={ updateStatus } 
        >
            <LeftColumn>

                { Object.keys( retrieveStatus ).length > 0
                ? 
                <LoaderIcon />
                :

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

                }
            </LeftColumn>

            <RightColumn>
                <MapGeometry />
                <MapTools />
            </RightColumn>

            { message 
            ? <Message message={ message } onClose={ closeMessage } />
            : null 
            }
        </Page>
    );
}

export { MapPage };