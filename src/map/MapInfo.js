import "./style/mapInfo.css";

import { useContext, useEffect } from "react";
import { MapContext } from "./MapContext";
import { Rows, Row } from "../_commons/Rows";
import { DropDown } from "../_commons/Drop";
import { Text } from "../_commons/Text";

function MapInfo() {

    const { map: { title, description, username } } = useContext( MapContext );

    useEffect( () => console.log( 'Has rendered:', 'MapInfo' ) );

    return ( 
        <DropDown className="MapInfo" title={ title }>
            <div>
                { description }
            </div>
            <div>
                { `(map created by ${username})` }
            </div>
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