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
import { Text, Input } from "../commons/Basics";
import { List, Item } from '../commons/List';
import { AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon, LoaderIcon } from '../commons/Icon';
import { Message } from "../commons/Message";
import { MapForm } from "../map/MapForm";

function MyMapsList() {

    const { status, setStatus, setAssets } = useMyMapsFlow();
    const { values, getValue, setValue, onRetrieve } = useMyMapsValues( { initial: { user_id: "1010" } } );
    const { request, onGetRequest } = useMyMapsRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const { form, openForm, closeForm } = useForm();
    const { maps } = useContext( MyMapsContext );
    const { mapPage, myMapsLoaded } = useContext( AppContext );

    const disabledOrNot = status.onRequest ? "disabled" : "";
    
    useEffect( () => {
        if ( !myMapsLoaded ) {
            setStatus( { autoRetrieve: true } );
        }
    }, [] );

    return (
        <List className={ `MyMapsList ${disabledOrNot}` }>
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <EditIcon onClick={ () => openForm( map ) } />
                        <DrawIcon onClick={ mapPage } />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <Input
                    placeholder="Create new map..."
                    value={ getValue( "title" ) }
                    onChange={ e => setValue( "title", e.target.value ) } 
                />
                <Columns>
                    { ! status.isRequesting 
                    ? 
                        <AddIcon onClick={ null }/>
                    : 
                        <LoaderIcon /> 
                    }

                </Columns>
            </Item>

            { message 
            ? <Message close={ closeMessage }>{ message }</Message>
            : null }

            { form 
            ? <MapForm map={ form.payload } onClose={ closeForm } />
            : null }

        </List>
    );
}

export { MyMapsList };