import "./style/mapInfo.css";

import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Rows, Row } from "../_commons/Rows";
import { DropDown } from "../_commons/Drop";
import { Text } from "../_commons/Text";

function MapInfo() {

    const { map: { title, description } } = useContext( MapContext );

    useEffect( () => console.log( 'Has rendered:', 'MapInfo' ) );

    return ( 
        <DropDown className="MapInfo" title={ title }>
            { description }
        </DropDown>
    );
}
        /* <Rows className="MapInfo">

            <Row className="title">
                <Text>{ title }</Text>
            </Row>

            <Row className="content">
                <Text>{ description }</Text>
            </Row>
        </Rows> */


export { MapInfo };