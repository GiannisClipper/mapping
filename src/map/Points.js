import { useContext} from "react";
import { GeoRefContext } from "../geometry/GeoRefContext";
import { MapContext } from "./MapContext";
import { useForm } from "../_commons/logic/useForm";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreatePointMiniForm, UpdatePointForm, DeletePointForm } from "./PointForm";

function Points() {

    const { geoRef } = useContext( GeoRefContext );
    const { map: { points } } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

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
                            const zoom = geoRef.current.map.ref.getZoom();
                            geoRef.current.map.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                            geoRef.current.points[ index ].onClick();
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