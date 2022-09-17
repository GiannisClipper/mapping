import { geoDistance } from "./geoDistance"; 

function useGeoLine( { map, geoRef, index } ) {

    const { focus } = geoRef.current;

    const addPosition = event => {
        const { index } = focus;
        const { lat, lng } = event.latlng;
        const newPosition = [ lat, lng ];
        const { positions } = map.lines[ index ];
        positions.push( newPosition ); // direct assignment to state, to avoid redundunt rerender
        geoRef.current.lines[ index ].setDraw( { positions } );
        geoRef.current.lineMarkers.setDraw( { positions } );
    }

    const insertPosition = event => {
        const { index } = focus;
        const { lat, lng } = event.latlng;
        const newPosition = [ lat, lng ];
        const { positions } = map.lines[ index ];

        const ratio = [];
        for ( let i = 0; i < positions.length - 1; i++ ) {
            const distance = 
                geoDistance( newPosition, positions[ i ] ) + 
                geoDistance( newPosition, positions[ i + 1 ] );

            const segmentDistance = 
                geoDistance( positions[ i ], positions[ i + 1 ] );

            ratio.push( distance/ segmentDistance );
        }

        let minRatioIndex = 0;
        for ( let i = 1; i < ratio.length; i++ ) {
            if ( ratio[ i ] < ratio[ minRatioIndex ] ) {
                minRatioIndex = i;
            }
        }

        positions.splice( minRatioIndex + 1, 0, newPosition );
        geoRef.current.lines[ index ].setDraw( { positions } );
        geoRef.current.lineMarkers.setDraw( { positions } );
    }
 
    const movePosition = event => {
        const { index: lineIndex } = focus;
        const { lat, lng } = event.target.getLatLng();
        const newPosition = [ lat, lng ];
        const { positions } = map.lines[ lineIndex ];
        positions[ index ] = newPosition; // direct assignment to state, to avoid redundunt rerender
        geoRef.current.lines[ lineIndex ].setDraw( { positions } );
    }

    const removePosition = event => {
        const { index: lineIndex } = focus;
        const { positions } = map.lines[ lineIndex ];
        if ( positions.length > 2 ) {
            positions.splice( index, 1 ); // direct assignment to state, to avoid redundunt rerender
            geoRef.current.lines[ lineIndex ].setDraw( { positions } );
            geoRef.current.lineMarkers.setDraw( { positions } );
        }
    }

    return { addPosition, insertPosition, movePosition, removePosition };
}

export { useGeoLine };