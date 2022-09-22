import "./style/list.css";

import { setClassName } from "./logic/helpers";
import { Rows, Row } from "../_commons/Rows";

function List( { className, ...props } ) {

    return (
        <Rows className={ setClassName( 'List', className ) } { ...props }>
            { props.children }
        </Rows>
    );
}

function Item( { className, onClick, ...props } ) {
    return (
        <Row className={ setClassName( 'Item', className ) } onClick={ onClick }>
            { props.children }
        </Row>
    );
}

export { List, Item };