import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavigateButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreatePointMiniForm } from "./PointForm";

function Points( { points } ) {

    return (
        <Rows className="Points">
            { points.map( ( point, index ) => 
                <Row key={ index }>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <EditButton />
                        <NavigateButton />
                        <ViewButton />
                        <TrashButton />
                    </Columns>
                </Row>
            ) }
            <Row>
                <CreatePointMiniForm />
            </Row>
        </Rows>
    );
}

export { Points };