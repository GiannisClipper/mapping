import "./style/drop.css";

import { useState } from "react";
import { SimpleDownArrowButton, SimpleRightArrowButton } from "./Button";

function Title( { onClick, ...props } ) {

    return (
        <div className="Title" onClick={ onClick } >
            { props.children }
        </div>
    )
}

function DropDownContent( props ) {

    return (
        <div className="DropDownContent">
            { props.children }
        </div>
    )
}

function DropDown( { className, title, ...props } ) {

    const [ isOpen, setIsOpen ] = useState( true );

    return (
        <div className={ `DropDown ${className}` }>
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
        </div>
    )
}

export { DropDown };