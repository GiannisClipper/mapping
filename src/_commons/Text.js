import "./style/text.css";

import { setClassName } from "./logic/helpers";

function Text( { className, onClick, draggable, onDragStart, onDragOver, onDrop, ...props } ) {

    className = ( className || "" ) + ( onClick ? " onClick" : "" );

    return (
        <div 
            className={ setClassName( 'Text', className ) } 
            onClick={ onClick }
            draggable={ draggable }
            onDragStart={ onDragStart } 
            onDragOver={ onDragOver } 
            onDrop={ onDrop }
        >
            { props.children }
        </div>
    );
}

export { Text };