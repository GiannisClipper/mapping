import { useContext, useEffect } from "react";
import { AppContext } from "../AppContext";

function useRouteListener() {

    const { currentPage, setCurrentPage, nextPage, setNextPage } = useContext( AppContext );

    useEffect( () => { 
        if ( ! currentPage.endpoint ) {
            setCurrentPage( { ...nextPage } );
            return;
        }
        if ( currentPage.endpoint !== nextPage.endpoint ) {
            if ( currentPage.onClose ) {
                currentPage.onClose();
                return;
            }
            setCurrentPage( { ...nextPage } );
        }
    }, [ currentPage, setCurrentPage, nextPage ] );

    useEffect( () => { 
        const onPopstate = event => setNextPage( { endpoint: window.location.pathname } );
        window.addEventListener( 'popstate', onPopstate );
        return () => window.removeEventListener( 'popstate', onPopstate );
    }, [] );

    return { currentPage };
}

export { useRouteListener };