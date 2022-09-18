import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { useForm } from "../_commons/logic/useForm";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreatePointMiniForm, UpdatePointForm, DeletePointForm } from "./PointForm";
import { Map as GeoMap } from "../geometry/map";
import { Point as GeoPoint } from "../geometry/point";
import { usePointChange } from "./logic/usePointChange";

function Points() {

    const { map: { points } } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

    const { onChangePosition } = usePointChange();
    useEffect( () => GeoPoint.onChangePosition = onChangePosition, [ onChangePosition ] );

    return (
        <>
        <Rows className="Points">
            { points.map( ( point, index ) => 
                <Row key={ index }>
                    <Text>{ point.title }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, point } ) } />

                        <NavButton onClick={ e => { 
                            const { position } = point;
                            const zoom = GeoMap.ref.getZoom();
                            GeoMap.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                            GeoPoint.instances.getByIndex( index ).setFocus();
                        } } />

                        <ViewButton />

                        <TrashButton onClick={ () => openForm( { onClickDelete: true, point } ) } />
                    </Columns>
                </Row>
            ) }
            <Row>
                <CreatePointMiniForm />
            </Row>
        </Rows>

        { form && form.onClickUpdate
        ? <UpdatePointForm point={ form.point } onClose={ closeForm } />
        : null
        }

        { form && form.onClickDelete
        ? <DeletePointForm point={ form.point } onClose={ closeForm } />
        : null 
        }

        </>    
    );
}

export { Points };