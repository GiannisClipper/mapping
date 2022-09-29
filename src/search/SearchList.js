import "./style/searchList.css";

import { useContext, useEffect } from "react"; 
import { useMessage } from "../_commons/logic/useMessage";
import { useRetrieveFlow } from "../_commons/logic/useFlow";
import { useValues } from "../_commons/logic/useValues";
import { newMapSchema } from "../map/logic/schema";
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

    const { values, getValue, setValue, resetValues } = useValues( newMapSchema() );
    const { message, openMessage, closeMessage } = useMessage();
    const { status, setStatus } = useRetrieveFlow( {
        values,
        resetValues,
        useRequest: useSearchRequest,
        useResponse: useSearchResponse, 
        onError: openMessage,
    } );

    const onClickSearch = () => setStatus( { triggeredFlow: true } );

    const { maps } = useContext( SearchContext );

    return (
        <List className="SearchList" disabled={ Object.keys( status ).length > 0 }>
            <Item>
                <Input
                    placeholder="Search published maps..."
                    value={ getValue( "title" ) }
                    onChange={ e => setValue( "title", e.target.value ) } 
                />
                <Columns>
                    <SearchButton 
                        title="Search maps"
                        onClick={ onClickSearch } isWaiting={ Object.keys( status ).length > 0 } 
                    />
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
            ? <Message message={ message } onClose={ closeMessage } />
            : null 
            }
        </List>
    );
}

export { SearchList };