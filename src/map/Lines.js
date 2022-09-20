import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { useForm } from "../_commons/logic/useForm";
import { useLineDraw } from "./logic/useLineDraw";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreateLineMiniForm, UpdateLineForm, DeleteLineForm } from "./LineForm";
import { Map as GeoMap } from "../geometry/map";
import { Line as GeoLine } from "../geometry/line";

function Lines() {

    const { map: { lines } } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

    const { onDraw } = useLineDraw();
    useEffect( () => GeoLine.onDraw = onDraw, [ onDraw ] );

    return (
        <>
        <Rows className="Lines">
            { lines.map( ( line, index ) => 
                <Row key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, line } ) } />

                        <NavButton onClick={ e => { 
                            const center = GeoLine.instances.getByIndex( index ).ref.getCenter();
                            const zoom = GeoMap.ref.getZoom();
                            GeoMap.ref.setView( center, zoom, { animate: true, duration: 1.5 } );
                            GeoLine.instances.getByIndex( index ).setFocus();
                        } } />

                        <ViewButton />

                        <TrashButton onClick={ () => openForm( { onClickDelete: true, line } ) } />
                    </Columns>
                </Row>
            ) }
            <Row>
                <CreateLineMiniForm />
            </Row>
        </Rows>

        { form && form.onClickUpdate
        ? <UpdateLineForm line={ form.line } closeForm={ closeForm } />
        : null
        }

        { form && form.onClickDelete
        ? <DeleteLineForm line={ form.line } closeForm={ closeForm } />
        : null 
        }

        </>    
    );
}

export { Lines };