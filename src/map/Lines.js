import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { Input } from "../_commons/Input";
import { AddButton, EditButton, NavigateButton, ViewButton, TrashButton } from '../_commons/Button';

function Lines( { lines } ) {

    return (
        <Rows className="Lines">
            { lines.map( ( line, index ) => 
                <Row key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditButton />
                        <NavigateButton />
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