import "./style/searchList.css";
import { useContext } from "react"; 
import { useMessage } from "../commons/logic/useMessage";
import { useMapValues } from "../map/logic/useMapValues";
import { useRequest } from "../commons/logic/useRequest";
import { SearchContext  } from "./SearchContext";
import { Columns } from "../commons/Columns";
import { Text, Input } from "../commons/Basics";
import { List, Item } from '../commons/List';
import { SearchIcon, LoaderIcon, ShowIcon } from '../commons/Icon';
import { Message } from "../commons/Message";

function SearchList() {

    const { message, openMessage, closeMessage } = useMessage();
    const { getValue, setValue } = useMapValues( { map: { title: "" }, onError: openMessage } );

    const { status, setRequest } = useRequest( { onSuccess: openMessage, onError: openMessage } );
    const { request, maps } = useContext( SearchContext );

    const disabledOrNot = status.isRequesting?"disabled":"";
    
    return (
        <List className={ `SearchList ${disabledOrNot}` }>
            <Item>
                <Input
                    placeholder="Search published maps..."
                    value={ getValue( "title" ) }
                    onChange={ e => setValue( "title", e.target.value ) } 
                />
                <Columns>
                    { ! status.isRequesting 
                    ? 
                        <SearchIcon onClick={ () => setRequest( {
                            url: "url_that_does_not_exists",
                            options: { method: "GET" },
                        } ) } />
                    : 
                        <LoaderIcon /> 
                    }
                </Columns>
            </Item>

            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <ShowIcon />
                    </Columns>
                </Item>
            ) }

            { message 
            ? <Message close={ closeMessage }>{ message }</Message>
            : null }
        </List>
    );
}

export { SearchList };