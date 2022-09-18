// getDistance() is based on: https://www.geeksforgeeks.org/program-distance-two-points-earth/

function toRadians( degrees ) {
    return degrees / ( 180 / Math.PI );
}

function getDistance( point1, point2 ) { // pointX = [ lat, lng ]

    // convert degrees to radians
    const lat1 = toRadians( point1[ 0 ] );
    const lng1 = toRadians( point1[ 1 ] );
    const lat2 = toRadians( point2[ 0 ] );
    const lng2 = toRadians( point2[ 1 ] );
        
    // Haversine Formula
    const latDiff = lat2 - lat1;
    const lngDiff = lng2 - lng1;
    
    let result = Math.pow( Math.sin( latDiff / 2 ), 2 ) +
        Math.cos( lat1 ) * Math.cos( lat2 ) * Math.pow( Math.sin( lngDiff / 2 ), 2 );

    result = 2 * Math.asin( Math.sqrt( result ) );

    const R = 6371; // earth radius is 6371 (kilometers) or 3956 (miles)
    result = result * R;

    return result;

    // const lat1 = 53.32055555555556
    // const lng1 = -1.7297222222222221
    // const lat2 = 53.31861111111111
    // const lng2 = -1.6997222222222223
    // console.log( geoDistance( [ lat1, lng1 ], [ lat2, lng2 ] ) );
    // result should be 2.0043678382716137    
}

function getPositionOrder( position, positions ) { // point = [ lat, lng ]

    const ratio = [];
    for ( let i = 0; i < positions.length - 1; i++ ) {
        const distance = 
            getDistance( position, positions[ i ] ) + 
            getDistance( position, positions[ i + 1 ] );

        const segmentDistance = 
            getDistance( positions[ i ], positions[ i + 1 ] );

        ratio.push( distance / segmentDistance );
    }

    let minRatioIndex = 0;
    for ( let i = 1; i < ratio.length; i++ ) {
        if ( ratio[ i ] < ratio[ minRatioIndex ] ) {
            minRatioIndex = i;
        }
    }

    return minRatioIndex + 1;
}

export { getDistance, getPositionOrder };