// import { useRef } from "react";

function useDrag( { onMove } ) {

    // const mem = useRef( { dragIndex: null, dropIndex: null } );
 
    const onDragStart = ( e, index ) => {
        // mem.current.dragIndex = index;
        const payload = `${index},${e.target.className}`;
        e.dataTransfer.setData( 'text/plain', payload );
    }

    const onDragOver = e => {
        e.preventDefault();
    }

    const onDrop = ( e, dropIndex ) => {
        // mem.current.dropIndex = index;
        const payload = e.dataTransfer.getData( 'text/plain' );
        const comma = payload.indexOf( ',' );
        const className = payload.substring( comma + 1 );
        const dragIndex = parseInt( payload );

        if ( dragIndex !== dropIndex && e.target.className === className ) {
            onMove( dragIndex, dropIndex );
        }
    };

    return { onDragStart, onDragOver, onDrop };
}

export { useDrag };