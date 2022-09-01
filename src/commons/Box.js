import "./style/box.css";

import { Rows, Row } from "./Rows";
import { useState } from "react";

function Title( { onClick, ...props } ) {

    return (
        <Row className="Title" onClick={ onClick } >
            { props.children }
        </Row>
    )
}

function Content( props ) {

    return (
        <Rows className="Content">
            { props.children }
        </Rows>
    )
}

function Box( { className, title, ...props } ) {

    const [ isOpen, setIsOpen ] = useState( true );

    return (
        <Rows className={ `Box ${className}` }>
            <Title onClick={ () => setIsOpen( ! isOpen ) } >
                { title }
            </Title>
            { isOpen 
            ?
            <Content>
                { props.children }
            </Content>
            :
            null }
        </Rows>
    )
}

export { Box };