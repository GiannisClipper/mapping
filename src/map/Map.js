import { useContext, useEffect, memo } from "react";
import { useForm } from "../_commons/logic/useForm";
import { MapContext } from "./MapContext";
import { Row } from "../_commons/Rows";
import { Columns } from "../_commons/Columns";
import { Text } from "../_commons/Text";
import { EditButton, NavButton, TrashButton } from '../_commons/Button';
import { Map as GeoMap } from "../geometry/map";
import { Center as GeoCenter } from "../geometry/center";
import { useCenterDraw } from "./logic/useCenterDraw";
import { UpdateMapForm, DeleteMapForm } from "../map/MapForm";

const Map = memo ( () => {

    const { map, setMap } = useContext( MapContext );
    const { form, openForm, closeForm } = useForm();

    const { onDraw } = useCenterDraw();
    useEffect( () => GeoCenter.onDraw = onDraw, [ onDraw ] );

    useEffect( () => {
        if ( GeoMap.ref ) { 
            const { position, zoom } = map;
            if ( zoom !== null ) {
                GeoMap.ref.setView( position, zoom, { animate: true, duration: 2 } );
            }
        }
    }, [] );

    useEffect( () => console.log( 'Has rendered:', 'Map' ) );

    return (
        <Row className="Map">
            <Text>{ map.title }</Text>

            <Columns>
                <NavButton
                    title="Navigation" 
                    onClick={ event => {
                        let { title, position, zoom } = map;
                        if ( zoom === null ) {
                            const { lat, lng } = GeoMap.ref.getCenter();
                            position = [ lat, lng ];
                            zoom = GeoMap.ref.getZoom();
                            setMap( { ...map, position, zoom } );
                        }

                        GeoMap.ref.setView( position, zoom, { animate: true, duration: 1.5 } );
                        if ( ! GeoCenter.instance ) {
                            GeoCenter.instance = new GeoCenter( { title, position, zoom } );
                        }
                        GeoCenter.instance.setFocus();
                    } } 
                />

                <EditButton 
                    title="Update"
                    onClick={ () => openForm( { onClickUpdate: true, map } ) } 
                />
                <TrashButton 
                    title="Delete"
                    onClick={ () => openForm( { onClickDelete: true, map } ) } 
                />
            </Columns>
            
            { form && form.onClickUpdate
                ? <UpdateMapForm map={ form.map } closeForm={ closeForm } />
                : null }

            { form && form.onClickDelete
                ? <DeleteMapForm map={ form.map } closeForm={ closeForm } />
                : null }
        </Row>
    );
} );

export { Map };