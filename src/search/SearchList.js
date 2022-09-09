import "./style/searchList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newSchema as newMapSchema } from "../map/logic/schema";
import { useSearchRequest } from "./logic/useSearchRequest";
import { useSearchResponse } from "./logic/useSearchResponse";
import { SearchContext  } from "./SearchContext";
import { Columns } from "../_commons/Columns";
import { Row } from "../_commons/Rows";
import { Text } from "../_commons/Text";
import { Input } from "../_commons/Input";
import { List, Item } from '../_commons/List';
import { SearchButton, ViewButton } from '../_commons/Button';
import { Message } from "../_commons/Message";

function SearchList() {

    const { status, setStatus, setAssets } = useRetrieveFlow();
    const { values, getValue, setValue } = useValues( newMapSchema() );
    const { request, onGetRequest } = useSearchRequest( { status, setStatus } );
    const { onRetrieve } = useSearchResponse( { setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const onClickSearch = () => setStatus( { onFlow: true } );

    const { maps } = useContext( SearchContext );

    const disabledOrNot = status.onRequest ? "disabled" : "";
    
    return (
        <List className={ `SearchList ${disabledOrNot}` }>
            <Item>
                <Input
                    placeholder="Search published maps..."
                    value={ getValue( "title" ) }
                    onChange={ e => setValue( "title", e.target.value ) } 
                />
                <Columns>
                    <SearchButton onClick={ onClickSearch } isWaiting={ status.onRequest } />
                </Columns>
            </Item>

            { maps.map( ( map, index ) => 
                <Item key={ index }>
                    <Text>
                        <Row>{ map.title }</Row>
                        <Row>by { map.username }</Row>
                    </Text>
                    <Columns>
                        <ViewButton />
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