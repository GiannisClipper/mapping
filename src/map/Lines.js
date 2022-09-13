import { useContext} from "react";
import { MapContext } from "./MapContext";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { Input } from "../_commons/Input";
import { AddButton, EditButton, CompassButton, ViewButton, TrashButton } from '../_commons/Button';

function Lines() {

    const { map } = useContext( MapContext );
    const { lines } = map;
    
    return (
        <Rows className="Lines">
            { lines.map( ( line, index ) => 
                <Row key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditButton />
                        <CompassButton />
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

export { Lines };