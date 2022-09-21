import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { useForm } from "../_commons/logic/useForm";
import { useDrag } from "../_commons/logic/useDrag";
import { usePointDrag } from "./logic/usePointDrag";
import { usePointDraw } from "./logic/usePointDraw";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, TrashButton } from '../_commons/Button';
import { CreatePointMiniForm, UpdatePointForm, DeletePointForm } from "./PointForm";
import { Map as GeoMap } from "../geometry/map";
import { Point as GeoPoint } from "../geometry/point";

function Points() {

    const { map: { points } } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

    const { onMove } = usePointDrag();
    const { onDragStart, onDragOver, onDrop } = useDrag( { onMove } );

    const { onDraw } = usePointDraw();
    useEffect( () => GeoPoint.onDraw = onDraw, [ onDraw ] );

    return (
        <>
        <Rows className="Points">
            { points.map( ( point, index ) => 
                <Row key={ index }>
                    <Text
                        className="point"
                        draggable={ true } 
                        onDragStart={ e => onDragStart( e, index ) }
                        onDragOver={ onDragOver } 
                        onDrop={ e => onDrop( e, index ) }
                    >
                        { point.title }
                    </Text>

                    <Columns>
                        <NavButton onClick={ e => { 
                            const { position } = point;
                            const zoom = GeoMap.ref.getZoom();
                            GeoMap.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                            GeoPoint.instances.getByIndex( index ).setFocus();
                        } } />

                        <EditButton onClick={ () => openForm( { onClickUpdate: true, point } ) } />

                        <TrashButton onClick={ () => openForm( { onClickDelete: true, point } ) } />
                    </Columns>
                </Row>
            ) }
            <Row>
                <CreatePointMiniForm />
            </Row>
        </Rows>

        { form && form.onClickUpdate
        ? <UpdatePointForm point={ form.point } closeForm={ closeForm } />
        : null
        }

        { form && form.onClickDelete
        ? <DeletePointForm point={ form.point } closeForm={ closeForm } />
        : null 
        }

        </>    
    );
}

export { Points };