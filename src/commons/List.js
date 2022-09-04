import "./style/list.css";

import { Rows, Row } from "../commons/Rows";

function List( { className, ...props } ) {

    return (
        <Rows className={ `List ${className}` }>
            { props.children }
        </Rows>
    );
}

function Item( { className, onClick, ...props } ) {
    return (
        <Row className={ `Item ${className}` } onClick={ onClick }>
            { props.children }
        </Row>
    );
}

export { List, Item };