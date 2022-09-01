import "./style/mapPage.css";
import { useContext } from "react";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basic";
import { List, Item } from '../commons/List';
import { AddIcon, EditIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icons';
import { AppContext } from "../app/AppContext";

function MapPage() {

    return (
        <Page className="MapPage">
            <LeftColumn>
                <Text>[ Map ]</Text>
                <MapList />

                <Text>[ Lines ]</Text>
                <LinesList />

                <Text>[ Points ]</Text>
                <PointsList />
            </LeftColumn>

            <RightColumn>
                Map...
            </RightColumn>
        </Page>
    );
}

function MapList() {

    const { map } = useContext( AppContext );

    return (
        <List className="MapList">
            <Item>
                <Text>{ map.title }</Text>

                <Columns>
                    <EditIcon />
                    <DrawIcon />
                    <ShowIcon />
                    <DeleteIcon />
                </Columns>
            </Item>
        </List>
    );
}

function LinesList() {

    const { map } = useContext( AppContext );

    return (
        <List className="LinesList">
            { map.lines.map( line => 
                <Item>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditIcon />
                        <DrawIcon />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input type="text" id="add" name="add" placeholder="Create new..." />

                <Columns>
                    <AddIcon />
                </Columns>
            </Item>

        </List>
    );
}

function PointsList() {

    const { map } = useContext( AppContext );

    return (
        <List className="PointsList">
            { map.points.map( point => 
                <Item>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <EditIcon />
                        <DrawIcon />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input type="text" id="add" name="add" placeholder="Create new..." />

                <Columns>
                    <AddIcon />
                </Columns>
            </Item>

        </List>
    );
}

export { MapPage };