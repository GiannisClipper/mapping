import "./style/myMapsList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newSchema as newMapSchema } from "../map/logic/schema";
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
import { PublishedIcon, UnpublishedIcon } from '../_commons/Icon';
import { Message } from "../_commons/Message";
import { CreateMapForm, UpdateMapForm, DeleteMapForm } from "../map/MapForm";

function MyMapsList() {

    const { responseSignin: { id: user_id } } = useContext( SigninContext );

    const { status, setStatus, setAssets } = useRetrieveFlow();
    const { values } = useValues( newMapSchema( { user_id } ) );
    const { request, onGetRequest } = useMyMapsRequest( { status, setStatus } );
    const { onRetrieve } = useMyMapsResponse( { setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const { form, openForm, closeForm } = useForm();
    const { maps } = useContext( MyMapsContext );
    const { mapPage, myMapsAutoRetrieve } = useContext( AppContext );
    
    useEffect( () => {
        if ( myMapsAutoRetrieve ) {
            setStatus( { triggeredFlow: true } );
        }
    }, [] );

    return (
        <>
        <List className="MyMapsList" disabled={ status.onRequest }>
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    
                    { map.published ? <PublishedIcon /> : <UnpublishedIcon /> }

                    <Text>{ map.title }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, map } ) } />
                        <MappingButton onClick={ mapPage } />
                        <ViewButton />
                        <TrashButton onClick={ () => openForm( { onClickDelete: true, map } ) } />
                    </Columns>
                </Item>
            ) }
            <Item>
                <CreateMapForm map={ { tttle: "", description: "" } } />
            </Item>
        </List>

        { form && form.onClickUpdate
        ? <UpdateMapForm map={ form.map } onClose={ closeForm } />
        : null }

        { form && form.onClickDelete
        ? <DeleteMapForm map={ form.map } onClose={ closeForm } />
        : null }

        { message 
        ? <Message close={ closeMessage }>{ message }</Message>
        : null }
        </>
    );
}

export { MyMapsList };