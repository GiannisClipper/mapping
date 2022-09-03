import "./style/searchList.css";
import { useContext } from "react"; 
import { SearchContext  } from "./SearchContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { List, Item } from '../commons/List';
import { SearchIcon, ShowIcon } from '../commons/Icons';

function SearchList() {

    const { request, maps } = useContext( SearchContext );

    return (
        <List className="SearchList">
            <Item>
                <input type="text" id="search" name="search" placeholder="Search published maps..." />

                <Columns>
                    <SearchIcon onClick={ request } />
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
        </List>
    );
}

export { SearchList };