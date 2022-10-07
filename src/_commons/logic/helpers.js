const setClassName = ( ...names ) => names.filter( name => name ).join( ' ' );

const moveByIndex = ( list, from, to ) => {

    const item = list[ from ];
    const step = from < to ? 1 : -1;
    for ( let i = from * step; i < to * step; i += step * step ) {
        list[ i * step ] = list[ i * step + 1 * step ];
    }
    list[ to ] = item;

    return list;
}

function deepCopyArray( arr ) {
    const newArray = arr.map( row => deepCopy( row ) );
    return newArray;
}

function deepCopyObject( obj ) {
    const newObject = {};
    Object.keys( obj ).forEach( key => newObject[ key ] = deepCopy( obj[ key ]) );
    return newObject;
}

function deepCopy( value ) {    
    if ( value === null ) {
        return null;
    }
    if ( Array.isArray( value ) ) {
        return deepCopyArray( value );
    }
    if ( value instanceof Object ) {
        return deepCopyObject( value );
    }
    return value;
}

function saveAsTextFile( content, filename ) {
    const a = document.createElement( 'a' );

    a.href = URL.createObjectURL( new Blob( [ content ], { type: "text/plain" } ) );
    a.setAttribute( 'download', filename );

    document.body.appendChild( a );
    a.click();
    document.body.removeChild( a );
}

export { setClassName, moveByIndex, deepCopy, saveAsTextFile };