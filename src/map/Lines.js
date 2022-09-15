import { useContext} from "react";
import { GeoRefContext } from "../geometry/GeoRefContext";
import { MapContext } from "./MapContext";
import { useForm } from "../_commons/logic/useForm";
import { Row, Rows } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, ViewButton, TrashButton } from '../_commons/Button';
import { CreateLineMiniForm, UpdateLineForm, DeleteLineForm } from "./LineForm";

function Lines() {

    const { geoRef } = useContext( GeoRefContext );
    const { map: { lines } } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

    return (
        <>
        <Rows className="Lines">
            { lines.map( ( line, index ) => 
                <Row key={ index }>
                    <Text>{ line.title }</Text>

                    <Columns>
                        <EditButton onClick={ () => openForm( { onClickUpdate: true, line } ) } />

                        <NavButton onClick={ e => { 
                            const { lat, lng } = line;
                            const zoom = geoRef.current.map.ref.getZoom();
                            geoRef.current.map.ref.setView( [ lat, lng ], zoom, { animate: true, duration: 1.5 } );
                            geoRef.current.lines[ index ].onClick();
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
        ? <UpdateLineForm line={ form.line } onClose={ closeForm } />
        : null
        }

        { form && form.onClickDelete
        ? <DeleteLineForm line={ form.line } onClose={ closeForm } />
        : null 
        }

        </>    
    );
}

export { Lines };