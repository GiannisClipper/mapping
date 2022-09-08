import "./style/myMapsList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../commons/logic/useMessage";
import { useRetrieveFlow } from "../commons/logic/useFlow";
import { useValues } from "../commons/logic/useValues";
import { newSchema as newMapSchema } from "../map/logic/schema";
import { useMyMapsRequest } from "./logic/useMyMapsRequest";
import { useMyMapsResponse } from "./logic/useMyMapsResponse";
import { useForm } from "../commons/logic/useForm";
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Text";
import { List, Item } from '../commons/List';
import { EditButton, MappingButton, ViewButton, TrashButton } from '../commons/Button';
import { PublishedIcon, UnpublishedIcon } from '../commons/Icon';
import { Message } from "../commons/Message";
import { CreateMapForm, UpdateMapForm, DeleteMapForm } from "../map/MapForm";

function MyMapsList() {

    const { status, setStatus, setAssets } = useRetrieveFlow();
    const { values } = useValues( newMapSchema( { user_id: "1010" } ) );
    const { request, onGetRequest } = useMyMapsRequest( { status, setStatus } );
    const { onRetrieve } = useMyMapsResponse( { setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const { form, openForm, closeForm } = useForm();
    const { maps } = useContext( MyMapsContext );
    const { mapPage, myMapsAutoRetrieve } = useContext( AppContext );

    const disabledOrNot = status.onRequest ? "disabled" : "";
    
    useEffect( () => {
        if ( myMapsAutoRetrieve ) {
            setStatus( { onFlow: true } );
        }
    }, [] );

    return (
        <>
        <List className={ `MyMapsList ${disabledOrNot}` }>
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