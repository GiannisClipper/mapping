import { useContext} from "react";
import { MapContext } from "./MapContext";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, CompassButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreatePointMiniForm } from "./PointForm";

function Points() {

        const { map } = useContext( MapContext );
    const { points } = map;

    return (
        <Rows className="Points">
            { points.map( ( point, index ) => 
                <Row key={ index }>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <EditButton />
                        <CompassButton onClick={ e => {
                            map.ref.setView( [ point.lat, point.lng ], map.ref.getZoom(), { animate: true, duration: 1.5 } );
                        } } />
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