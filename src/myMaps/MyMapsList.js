import "./style/myMapsList.css";
import { useContext, useEffect } from "react"; 
import { AppContext  } from "../app/AppContext";
import { MyMapsContext } from "./MyMapsContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { List, Item } from '../commons/List';
import { AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icons';
import { Message } from "../commons/Message";
import { MapForm } from "../map/MapForm";
import { useMapForm } from "../map/logic/mapForm";

function MyMapsList() {

    const { mapPage } = useContext( AppContext );
    const { maps, setMaps, request } = useContext( MyMapsContext );
    const { form, openForm, closeForm, message, closeMessage, getTitle, setTitle, createMap } = useMapForm( { maps, setMaps } );

    useEffect( () => { request() }, [ request ] );

    return (
        <List className="MyMapsList">
            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <EditIcon onClick={ openForm } />
                        <DrawIcon onClick={ mapPage } />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input
                    placeholder="Create new map..."
                    value={ getTitle() }
                    onChange={ event => setTitle( event.target.value ) } 
                />
                <Columns>
                    <AddIcon onClick={ createMap }/>
                </Columns>
            </Item>

            { message 
            ? <Message close={ closeMessage }>{ message }</Message>
            : null }

            { form 
            ? <MapForm onClose={ closeForm } />
            : null }

        </List>
    );
}

export { MyMapsList };