import "./style/pages.css";

import { useContext } from "react"; 
import { AppContext  } from "../app/AppContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { List, Item } from '../commons/List';
import { Page } from '../app/Page';
import { SingleColumn } from '../app/Main';
import { SearchIcon, ShowIcon } from '../commons/Icons';

function SearchPage() {
    return (
        <Page>
            <SingleColumn>
                <SearchList />
            </SingleColumn>
        </Page>
    );
}

function SearchList() {

    const { searchRequest, maps } = useContext( AppContext );

    return (
        <List className="SearchList">
            <Item>
                <input type="text" id="search" name="search" placeholder="Search published maps..." />

                <Columns>
                    <SearchIcon onClick={ searchRequest } />
                </Columns>
            </Item>

            { maps.map( map => 
                <Item>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <ShowIcon />
                    </Columns>
                </Item>
            ) }
        </List>
    );
}

export { SearchPage };