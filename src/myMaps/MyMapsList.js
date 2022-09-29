import "./style/myMapsList.css";

import { useContext } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newMapSchema } from "../map/logic/schema";
import { useMyMapsRequest } from "./logic/useMyMapsRequest";
import { useMyMapsResponse } from "./logic/useMyMapsResponse";
import { SigninContext  } from "../signin/SigninContext";
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { List, Item } from '../_commons/List';
import { MapButton, ViewButton } from '../_commons/Button';
import { LoaderIcon, LockIcon, UnlockIcon } from '../_commons/Icon';
import { Message } from "../_commons/Message";
import { CreateMapMiniForm } from "../map/MapForm";

function MyMapsList() {

    const { setNextPage, myMapsAutoRetrieve } = useContext( AppContext );
    const { responseSignin: { user_id } } = useContext( SigninContext );

    const initialStatus = myMapsAutoRetrieve ? { triggeredFlow: true } : null;

    const { values, resetValues } = useValues( newMapSchema( { user_id } ) );
    const { message, openMessage, closeMessage } = useMessage();
    const { status } = useRetrieveFlow( {
        values,
        resetValues,
        useRequest: useMyMapsRequest,
        useResponse: useMyMapsResponse, 
        onError: openMessage,
        initialStatus,
    } );

    const { maps } = useContext( MyMapsContext );

    return (
        <>
        <List className="MyMapsList" disabled={ Object.keys( status ).length > 0 }>

            { Object.keys( status ).length > 0
            ? 
            <LoaderIcon />
            :

            <> 
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    
                    { map.published ? <UnlockIcon /> : <LockIcon /> }

                    <Text>{ map.title }</Text>

                    <Columns>
                        <MapButton 
                            title="Draw map" 
                            onClick={ () => setNextPage( { endpoint: `/map/${map.id}` } ) } 
                        />
                        <ViewButton 
                            title="View map" 
                        />
                    </Columns>
                </Item>
            ) }

            <Item>
                <CreateMapMiniForm map={ newMapSchema( { user_id } ) } />
            </Item>
            </>

            }
        </List>

        { message 
        ? <Message message={ message } onClose={ closeMessage } />
        : null 
        }
        </>
    );
}

export { MyMapsList };