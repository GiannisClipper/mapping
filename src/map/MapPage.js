import "./style/mapPage.css";
import { Page } from '../app/Page';
import { LeftColumn, RightColumn } from '../app/Main';
import { DropDown } from "../_commons/Drop";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { Input } from "../_commons/Input";
import { List } from '../_commons/List';
import { AddButton, EditButton, MappingButton, ViewButton, TrashButton } from '../_commons/Button';

function MapPage( { map } ) {

    return (
        <Page className="MapPage">
            <LeftColumn>
            <List className="mapContents">
                <DropDown title="Map">
                    <MapRow map={ map }/>
                </DropDown>
                <DropDown title="Lines">
                    <LineRows map={ map }/>
                </DropDown>
                <DropDown title="Points">
                    <PointRows map={ map }/>
                </DropDown>
            </List>
            </LeftColumn>

            <RightColumn>
                Map...
            </RightColumn>
        </Page>
    );
}

function MapRow( { map } ) {

    return (
        <Row className="MapRow">
            <Text>{ map.title }</Text>

            <Columns>
                <EditButton />
                <MappingButton />
                <ViewButton />
                <TrashButton />
            </Columns>
        </Row>
    );
}

function LineRows( { map } ) {

    return (
        <Rows className="LineRows">
            { map.lines.map( ( line, index ) => 
                <Row key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditButton />
                        <MappingButton />
                        <ViewButton />
                        <TrashButton />
                    </Columns>
                </Row>
            ) }
            <Row>
                <Input 
                    placeholder="Create new..." 
                />

                <Columns>
                    <AddButton />
                </Columns>
            </Row>
        </Rows>
    );
}

function PointRows( { map } ) {

    return (
        <Rows className="PointRows">
            { map.points.map( ( point, index ) => 
                <Row key={ index }>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <EditButton />
                        <MappingButton />
                        <ViewButton />
                        <TrashButton />
                    </Columns>
                </Row>
            ) }
            <Row>
                <Input 
                    placeholder="Create new..." 
                />

                <Columns>
                    <AddButton />
                </Columns>
            </Row>
        </Rows>
    );
}

export { MapPage };