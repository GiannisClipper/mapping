function useGeoLine( { map, geoRef, focus, setFocus, index } ) {

    const addLineMarker = event => {
        const { index } = focus;
        const { lat, lng } = event.latlng;
        map.lines[ index ].positions.push( [ lat, lng ] ); // direct assignment to avoid redundunt rerender
        const { positions } = map.lines[ index ];
        geoRef.current.lines[ index ].setDraw( { positions } );
        geoRef.current.lineMarkers.setDraw( { positions } );
    }

    const insertLineMarker = () => {}

    const moveLineMarker = event => {
        const { index: lineIndex } = focus;
        const { lat, lng } = event.target.getLatLng();
        map.lines[ lineIndex ].positions[ index ] = [ lat, lng ]; // direct assignment to avoid redundunt rerender
        const { positions } = map.lines[ lineIndex ];
        geoRef.current.lines[ lineIndex ].setDraw( { positions } );
    }

    const removeLineMarker = event => {
        const { index: lineIndex } = focus;
        if ( map.lines[ lineIndex ].positions.length > 2 ) {
            map.lines[ lineIndex ].positions.splice( index, 1 ); // direct assignment to avoid redundunt rerender
            const { positions } = map.lines[ lineIndex ];
            geoRef.current.lines[ lineIndex ].setDraw( { positions } );
            geoRef.current.lineMarkers.setDraw( { positions } );
        }
    }

    return { addLineMarker, insertLineMarker, moveLineMarker, removeLineMarker };
}

export { useGeoLine };