import "./style/myMapsList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newMapSchema } from "../map/logic/schema";
import { useMyMapsRequest } from "./logic/useMyMapsRequest";
import { useMyMapsResponse } from "./logic/useMyMapsResponse";
import { useForm } from "../_commons/logic/useForm";
import { SigninContext  } from "../signin/SigninContext";
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { List, Item } from '../_commons/List';
import { EditButton, MappingButton, ViewButton, TrashButton } from '../_commons/Button';
import { LoaderIcon, PublishedIcon, UnpublishedIcon } from '../_commons/Icon';
import { Message } from "../_commons/Message";
import { CreateMapMiniForm, UpdateMapForm, DeleteMapForm } from "../map/MapForm";

function MyMapsList() {

    const { setNextPage, myMapsAutoRetrieve } = useContext( AppContext );
    const { responseSignin: { user_id } } = useContext( SigninContext );

    const initialStatus = myMapsAutoRetrieve ? { triggeredFlow: true } : null;

    const { values, resetValues } = useValues( newMapSchema( { user_id } ) );
    const { message, openMessage, closeMessage } = useMessage();
    const { form, openForm, closeForm } = useForm();
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
        <List className="MyMapsList" disabled={ status.onRequest }>

            { Object.keys( status ).length > 0
            ? 
            <LoaderIcon />
            :

            <> 
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    
                    { map.published ? <PublishedIcon /> : <UnpublishedIcon /> }

                    <Text>{ map.title }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, map } ) } />

                        <MappingButton onClick={ () => {
                            setNextPage( { page: "MAP", payload: { map, index } } );
                        } } />

                        <ViewButton />

                        <TrashButton onClick={ () => openForm( { onClickDelete: true, map } ) } />
                    </Columns>
                </Item>
            ) }

            <Item>
                <CreateMapMiniForm map={ newMapSchema( { user_id } ) } />
            </Item>
            </>

            }
        </List>

        { form && form.onClickUpdate
        ? <UpdateMapForm map={ form.map } closeForm={ closeForm } />
        : null }

        { form && form.onClickDelete
        ? <DeleteMapForm map={ form.map } closeForm={ closeForm } />
        : null }

        { message 
        ? <Message message={ message } onClose={ closeMessage } />
        : null 
        }
        </>
    );
}

export { MyMapsList };