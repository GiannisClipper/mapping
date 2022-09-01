import "./style/pages.css";
import { useContext } from "react"; 
import { AppContext  } from "../app/AppContext";
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { List, Item } from '../commons/List';
import { Page } from '../app/Page';
import { SingleColumn } from '../app/Main';
import { AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icons';

function MyMapsPage() {
    return (
        <Page className="MyMapsPage">
            <SingleColumn>
                <MyMapsList />
            </SingleColumn>
        </Page>
    );
}

function MyMapsList() {

    const { maps, mapRequest, mapPage } = useContext( AppContext );

    const goMap = () => { mapRequest(); mapPage() };

    return (
        <List className="MyMapsList">
            { maps.map( map => 
                <Item>
                    <Text>{ map.title }</Text>

                    <Columns>
                        <EditIcon />
                        <DrawIcon onClick={ goMap } />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input type="text" id="add" name="add" placeholder="Create new map..." />

                <Columns>
                    <AddIcon />
                </Columns>
            </Item>

        </List>
    );
}

export { MyMapsPage };