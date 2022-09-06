import "./style/myMapsList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../commons/logic/useMessage";
import { useMyMapsFlow } from "./logic/useMyMapsFlow";
import { useMyMapsValues } from "./logic/useMyMapsValues";
import { useMyMapsRequest } from "./logic/useMyMapsRequest";
import { useForm } from "../commons/logic/useForm";
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Text";
import { List, Item } from '../commons/List';
import { UpdateIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icon';
import { Message } from "../commons/Message";
import { CreateMapForm, UpdateMapForm, DeleteMapForm } from "../map/MapForm";

function MyMapsList() {

    const { status, setStatus, setAssets } = useMyMapsFlow();
    const { values, onRetrieve } = useMyMapsValues( { initial: { user_id: "1010" } } );
    const { request, onGetRequest } = useMyMapsRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const { form, openForm, closeForm } = useForm();
    const { maps } = useContext( MyMapsContext );
    const { mapPage, myMapsAutoRetrieve } = useContext( AppContext );

    const disabledOrNot = status.onRequest ? "disabled" : "";
    
    useEffect( () => {
        if ( myMapsAutoRetrieve ) {
            setStatus( { autoRetrieve: true } );
        }
    }, [] );

    return (
        <>
        <List className={ `MyMapsList ${disabledOrNot}` }>
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <UpdateIcon onClick={ () => openForm( { onClickUpdate: true, map } ) } />
                        <DrawIcon onClick={ mapPage } />
                        <ShowIcon />
                        <DeleteIcon onClick={ () => openForm( { onClickDelete: true, map } ) } />
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