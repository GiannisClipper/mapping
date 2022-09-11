import "./style/drop.css";

import { useState } from "react";
import { Rows, Row } from "./Rows";
import { SimpleDownArrowButton, SimpleRightArrowButton } from "./Button";

function Title( { onClick, ...props } ) {

    return (
        <Row className="Title" onClick={ onClick } >
            { props.children }
        </Row>
    )
}

function DropDownContent( props ) {

    return (
        <Rows className="Content">
            { props.children }
        </Rows>
    )
}

function DropDown( { className, title, ...props } ) {

    const [ isOpen, setIsOpen ] = useState( true );

    return (
        <Rows className={ `DropDown ${className}` }>
            <Title onClick={ () => setIsOpen( ! isOpen ) } >
                { isOpen 
                ? <SimpleDownArrowButton>{ title }</SimpleDownArrowButton>
                : <SimpleRightArrowButton>{ title }</SimpleRightArrowButton>
                }
            </Title>

            { isOpen 
            ? <DropDownContent>{ props.children }</DropDownContent>
            : null 
            }
        </Rows>
    )
}

export { DropDown };