import "./style/drop.css";

import { useState } from "react";
import { setClassName } from "./logic/helpers";
import { SimpleDownArrowButton, SimpleRightArrowButton } from "./Button";

function Title( { onClick, ...props } ) {

    return (
        <div className="Title" onClick={ onClick } >
            { props.children }
        </div>
    )
}

function Content( props ) {

    return (
        <div className="Content">
            { props.children }
        </div>
    )
}

function DropDown( { className, title, ...props } ) {

    const [ isOpen, setIsOpen ] = useState( props.isOpen );

    return (
        <div className={ setClassName( 'DropDown', className ) }>
            <Title onClick={ () => setIsOpen( ! isOpen ) } >
                { isOpen 
                ? <SimpleDownArrowButton>{ title }</SimpleDownArrowButton>
                : <SimpleRightArrowButton>{ title }</SimpleRightArrowButton>
                }
            </Title>

            { isOpen 
            ? <Content>{ props.children }</Content>
            : null 
            }
        </div>
    )
}

export { DropDown };