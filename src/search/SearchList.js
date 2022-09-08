import "./style/searchList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../commons/logic/useMessage";
import { useSearchFlow } from "./logic/useSearchFlow";
import { useSearchValues } from "./logic/useSearchValues";
import { useSearchRequest } from "./logic/useSearchRequest";
import { SearchContext  } from "./SearchContext";
import { Columns } from "../commons/Columns";
import { Row } from "../commons/Rows";
import { Text } from "../commons/Text";
import { Input } from "../commons/Input";
import { List, Item } from '../commons/List';
import { SearchButton, ViewButton } from '../commons/Button';
import { Message } from "../commons/Message";

function SearchList() {

    const { status, setStatus, setAssets } = useSearchFlow();
    const { values, getValue, setValue, onRetrieve } = useSearchValues( { initial: { title: "" } } );
    const { request, onGetRequest } = useSearchRequest( { status, setStatus } );
    const { message, openMessage, closeMessage } = useMessage();
    const onError = openMessage;

    useEffect( () => { setAssets( { values, request, onGetRequest, onRetrieve, onError } ) } );

    const onClickSearch = () => setStatus( { clickRetrieve: true } );

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