import "./style/mapPage.css";

import { useEffect, useContext } from "react";
import { useMessage } from "../_commons/logic/useMessage";
import { useValues } from "../_commons/logic/useValues";
import { useRetrieveFlow, useUpdateFlow } from "../_commons/logic/useFlow";
import { useSaveOnClose } from "../app/logic/usePage";
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
import { Message, YesNoMessage } from "../_commons/Message";

function MapPage( { payload } ) {

    const { map: { id } } = payload;

    const { values, setValues } = useValues( newMapSchema( { id } ) );
    const { message, openMessage, closeMessage } = useMessage();

    const { status: retrieveStatus } = useRetrieveFlow( {
        values,
        setValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
        initialStatus: { triggeredFlow: true }
    } );

    const { status: updateStatus, setStatus: setUpdateStatus, flowAssets, setFlowAssets } = useUpdateFlow( {
        values,
        setValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
    } );

    const { map } = useContext( MapContext );

    const isChanged = () => {
        values.changeable = map;
        return JSON.stringify( values.initial ) !== JSON.stringify( values.changeable );
    }

    const onClickSave = () => {
        if ( isChanged() ) {
            setUpdateStatus( { triggeredFlow: true } );
        }
    }

    const { message: yesNoMessage, onYesAnswer, onNoAnswer } = useSaveOnClose( {
        values,
        isChanged,
        flowAssets,
        setFlowAssets,
        onSave: onClickSave,
    } );

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        
        <Page className="MapPage" 
            onClickSave={ onClickSave } 
            status={ updateStatus } 
            disabled={ Object.keys( updateStatus ).length > 0 }
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

            { yesNoMessage 
            ? <YesNoMessage message={ yesNoMessage } onYes={ onYesAnswer } onNo={ onNoAnswer } />
            : null 
            }

        </Page>
    );
}

export { MapPage };