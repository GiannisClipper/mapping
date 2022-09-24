import "./style/mapPage.css";

import { useEffect, useContext } from "react";
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow, useUpdateFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newMapSchema } from "./logic/schema";
import { useMapRequest } from "./logic/useMapRequest";
import { useMapResponse } from "./logic/useMapResponse";
import { MapContext } from "./MapContext";
import { AppContext } from "../app/AppContext";
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

    const { values, setValues, resetValues } = useValues( newMapSchema( { id } ) );
    const { message, openMessage, closeMessage } = useMessage();

    const { status: retrieveStatus } = useRetrieveFlow( {
        values,
        setValues,
        resetValues,
        useRequest: useMapRequest,
        useResponse: useMapResponse, 
        onError: openMessage,
        initialStatus: { triggeredFlow: true }
    } );

    const { status: updateStatus, setStatus: setUpdateStatus, setAssets: setUpdateAssets } = useUpdateFlow( {
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

    const { currentPage, setCurrentPage } = useContext( AppContext );
    const { message: yesNoMessage, openMessage: openYesNoMessage, closeMessage: closeYesNoMessage } = useMessage();
    
    const onClose = () => {
        if ( JSON.stringify( values.changeable ) !== JSON.stringify( map ) ) {
            openYesNoMessage( "Save changes before close?" );
        } else {
            setCurrentPage( { ...currentPage, onClose: null } );
        }
    }
    const onYesAnswer = () => { 
        closeYesNoMessage(); 
        onClickUpdate();
    }
    const onNoAnswer = () => {
        closeYesNoMessage(); 
        setCurrentPage( { ...currentPage, onClose: null } );
    }

    useEffect( () => () => {
        setUpdateAssets( { onFinish: () => setCurrentPage( { ...currentPage, onClose: null } ) } );
        currentPage.onClose = onClose; // direct assignment to avoid repeated rerenders
    } );

    useEffect( () => console.log( 'Has rendered:', 'MapPage' ) );

    return (
        
        <Page className="MapPage" 
            onClickUpdate={ onClickUpdate } 
            updateStatus={ updateStatus } 
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