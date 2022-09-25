import { useContext } from "react";
import { MapContext } from "../../map/MapContext";
import { useValidation } from "../../_commons/logic/useValidation";
import { isTitleBlank } from "./useMapValidation";

const isLineTitleExists = ( { values, lines } ) => {
    return values.changeable.title && 
        values.initial.title !== values.changeable.title && 
        lines.filter( line => line.title === values.changeable.title ).length > 0
        ? `Line title '${values.changeable.title}' already exists.`
        : null;
}

function useLineValidation( { setStatus } ) {

    const inherited = useValidation( { setStatus } );
    const { onValidate } = inherited;
    const { map: { lines } } = useContext( MapContext );

    const onCreateValidate = ( { values } ) => onValidate( [ 
        () => isTitleBlank( { values } ), 
        () => isLineTitleExists( { values, lines } ),
    ] );

    const onUpdateValidate = onCreateValidate;

    return { ...inherited, onCreateValidate, onUpdateValidate };
}

export { useLineValidation, isLineTitleExists };