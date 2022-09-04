import "./style/myMapsList.css";
import { useContext, useEffect } from "react"; 
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../commons/Columns";
import { Text, Input } from "../commons/Basics";
import { List, Item } from '../commons/List';
import { AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icon';
import { Message } from "../commons/Message";
import { MapForm } from "../map/MapForm";
import { useMessage } from "../commons/logic/useMessage";
import { useMapValues } from "../map/logic/useMapValues";
import { useForm } from "../commons/logic/useForm";

function MyMapsList() {

    const { form, openForm, closeForm } = useForm();
    const { message, openMessage, closeMessage } = useMessage();
    const { getValue, setValue, createMap } = useMapValues( { map: { title: "" }, onError: openMessage } );
    const { maps, request } = useContext( MyMapsContext );
    const { mapPage } = useContext( AppContext );

    useEffect( () => { request() }, [] );

    return (
        <List className="MyMapsList">
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
                    <AddIcon onClick={ createMap }/>
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