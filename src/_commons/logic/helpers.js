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

export { setClassName, moveByIndex };