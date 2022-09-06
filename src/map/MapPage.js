import "./style/mapPage.css";
import { useContext, useEffect } from "react";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { Columns } from "../commons/Columns";
import { Text } from "../commons/Basics";
import { List, Item } from '../commons/List';
import { CreateIcon, UpdateIcon, DrawIcon, ShowIcon, DeleteIcon } from '../commons/Icon';
import { MapContext } from "./MapContext";

function MapPage() {

    const { mapRequest } = useContext( MapContext );

    useEffect( () => { mapRequest() }, [ mapRequest ] );

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

    const { map } = useContext( MapContext );

    return (
        <List className="MapList">
            <Item>
                <Text>{ map.title }</Text>

                <Columns>
                    <UpdateIcon />
                    <DrawIcon />
                    <ShowIcon />
                    <DeleteIcon />
                </Columns>
            </Item>
        </List>
    );
}

function LinesList() {

    const { map } = useContext( MapContext );

    return (
        <List className="LinesList">
            { map.lines.map( ( line, index ) => 
                <Item key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <UpdateIcon />
                        <DrawIcon />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input type="text" id="add" name="add" placeholder="Create new..." />

                <Columns>
                    <CreateIcon />
                </Columns>
            </Item>

        </List>
    );
}

function PointsList() {

    const { map } = useContext( MapContext );

    return (
        <List className="PointsList">
            { map.points.map( ( point, index ) => 
                <Item key={ index }>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <UpdateIcon />
                        <DrawIcon />
                        <ShowIcon />
                        <DeleteIcon />
                    </Columns>
                </Item>
            ) }
            <Item>
                <input type="text" id="add" name="add" placeholder="Create new..." />

                <Columns>
                    <CreateIcon />
                </Columns>
            </Item>

        </List>
    );
}

export { MapPage };