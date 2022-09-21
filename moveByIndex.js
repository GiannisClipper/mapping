const moveByIndex = ( list, from, to ) => {
    const item = list[ from ];
    const step = from < to ? 1 : -1;
    for ( let i = from * step; i < to * step; i += step * step ) {
        list[ i * step ] = list[ i * step + 1 * step ];
    }
    list[ to ] = item;
    return list;
}

const list = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];

console.log( 'moveByIndex( list, 1, 8 )', moveByIndex( list, 1, 8 ) );
console.log( 'moveByIndex( list, 9, 2 )', moveByIndex( list, 9, 2 ) );